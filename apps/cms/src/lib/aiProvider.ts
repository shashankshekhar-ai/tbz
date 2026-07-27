/**
 * AI provider abstraction for the CMS agents (Page Agent, Content Agent).
 * Same idea as apps/api/core/ai_provider.py: one place that knows how to force
 * structured JSON output from either Anthropic or Gemini, picked at runtime via
 * AI_PROVIDER — callers pass a JSON-schema-style object and get a plain object back.
 */
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI, Type } from "@google/genai";

const ANTHROPIC_MODEL = "claude-sonnet-4-5";
const GEMINI_MODEL = "gemini-2.5-flash";

export class AIProviderError extends Error {}

export type AgentChatMessage = { role: "user" | "assistant"; content: string };

export type StructuredCallResult = {
  reply: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  proposal: Record<string, any> | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonSchema = Record<string, any>;

function provider(): string {
  return (process.env.AI_PROVIDER || "gemini").toLowerCase();
}

/**
 * Runs one turn of a chat-with-tool-proposal agent: free-text reply, plus an
 * optional structured proposal object when the model calls the update tool.
 */
export async function runAgentTurn(
  systemPrompt: string,
  history: AgentChatMessage[],
  stateContext: string,
  toolName: string,
  toolDescription: string,
  inputSchema: JsonSchema,
): Promise<StructuredCallResult> {
  if (provider() === "gemini") {
    return runGeminiTurn(systemPrompt, history, stateContext, toolName, toolDescription, inputSchema);
  }
  return runAnthropicTurn(systemPrompt, history, stateContext, toolName, toolDescription, inputSchema);
}

async function runAnthropicTurn(
  systemPrompt: string,
  history: AgentChatMessage[],
  stateContext: string,
  toolName: string,
  toolDescription: string,
  inputSchema: JsonSchema,
): Promise<StructuredCallResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new AIProviderError("ANTHROPIC_API_KEY is not configured");
  }
  const client = new Anthropic({ apiKey });

  const tool: Anthropic.Tool = {
    name: toolName,
    description: toolDescription,
    input_schema: { ...inputSchema, type: "object" },
  };
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: stateContext },
    ...history.map((m) => ({ role: m.role, content: m.content }) as Anthropic.MessageParam),
  ];

  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    tools: [tool],
    messages,
  });

  let reply = "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let proposal: Record<string, any> | null = null;
  for (const block of response.content) {
    if (block.type === "text") {
      reply += block.text;
    } else if (block.type === "tool_use" && block.name === toolName) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      proposal = block.input as Record<string, any>;
    }
  }
  return { reply, proposal };
}

const GEMINI_TYPE_MAP: Record<string, Type> = {
  object: Type.OBJECT,
  string: Type.STRING,
  integer: Type.INTEGER,
  number: Type.NUMBER,
  array: Type.ARRAY,
  boolean: Type.BOOLEAN,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toGeminiSchema(schema: JsonSchema): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: Record<string, any> = {};
  if (schema.type) out.type = GEMINI_TYPE_MAP[schema.type] ?? schema.type;
  if (schema.enum) out.enum = schema.enum;
  if (schema.properties) {
    out.properties = Object.fromEntries(
      Object.entries(schema.properties).map(([k, v]) => [k, toGeminiSchema(v as JsonSchema)]),
    );
  }
  if (schema.items) out.items = toGeminiSchema(schema.items);
  if (schema.required) out.required = schema.required;
  return out;
}

async function runGeminiTurn(
  systemPrompt: string,
  history: AgentChatMessage[],
  stateContext: string,
  toolName: string,
  _toolDescription: string,
  inputSchema: JsonSchema,
): Promise<StructuredCallResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AIProviderError("GEMINI_API_KEY is not configured");
  }
  const client = new GoogleGenAI({ apiKey });

  const conversation = [stateContext, ...history.map((m) => `${m.role}: ${m.content}`)].join("\n\n");

  let response;
  try {
    response = await client.models.generateContent({
      model: GEMINI_MODEL,
      contents: conversation,
      config: {
        systemInstruction: `${systemPrompt}\n\nAlways respond with a JSON object having two top-level keys: "reply" (your conversational text response) and "${toolName}" (the complete proposed state if you're proposing a change, or null if you're just answering a question).`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            [toolName]: toGeminiSchema(inputSchema),
          },
          required: ["reply"],
        },
      },
    });
  } catch (err) {
    throw new AIProviderError(`Gemini API call failed: ${err instanceof Error ? err.message : err}`);
  }

  const text = response.text;
  if (!text) {
    throw new AIProviderError("Gemini model returned no content");
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new AIProviderError(`Gemini response was not valid JSON: ${err instanceof Error ? err.message : err}`);
  }

  const reply = typeof parsed.reply === "string" ? parsed.reply : "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proposal = (parsed[toolName] as Record<string, any> | null | undefined) ?? null;
  return { reply, proposal };
}
