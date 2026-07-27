"use client";

import { useEffect, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };
type AgentBlock = { blockType: string; data: Record<string, unknown> };
type Proposal = { title: string; slug: string; blocks: AgentBlock[] };
type PageOption = { id: string; title: string; slug: string };

const BLOCK_LABEL: Record<string, string> = {
  hero: "Hero",
  richText: "Rich text",
  cardGrid: "Card grid",
  ctaBanner: "CTA banner",
};

function blockSummary(block: AgentBlock): string {
  const label = BLOCK_LABEL[block.blockType] ?? block.blockType;
  const heading = (block.data.heading as string) || (block.data.content as string) || "";
  return heading ? `${label} — ${heading.slice(0, 60)}` : label;
}

export function PageAgentView() {
  const [pages, setPages] = useState<PageOption[]>([]);
  const [pageId, setPageId] = useState<string>("");
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pages?limit=200&depth=0", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const docs = (data?.docs ?? []) as Array<{ id: string; title: string; slug: string }>;
        setPages(docs.map((d) => ({ id: d.id, title: d.title, slug: d.slug })));
      })
      .catch(() => setPages([]));
  }, []);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setSavedNotice(null);

    try {
      const resp = await fetch("/api/page-agent/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId: pageId || undefined, messages: nextMessages }),
      });
      const body = await resp.json();
      if (!resp.ok) {
        setError(body.error ?? "Agent request failed");
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: body.reply || "(no reply)" }]);
      if (body.proposal) setProposal(body.proposal);
    } catch {
      setError("Network error talking to the agent");
    } finally {
      setLoading(false);
    }
  }

  async function applyProposal() {
    if (!proposal) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/page-agent/apply", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId: pageId || undefined, proposal }),
      });
      const body = await resp.json();
      if (!resp.ok) {
        setError(body.error ?? "Failed to save page");
        return;
      }
      setPageId(body.id);
      setSavedNotice(`Saved as draft — /admin/collections/pages/${body.id}`);
      setProposal(null);
    } catch {
      setError("Network error saving the page");
    } finally {
      setLoading(false);
    }
  }

  const isNewPage = pageId === "";

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.25rem" }}>Page Agent</h1>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        Describe a page in plain English. The agent proposes a layout — nothing saves until you
        click Apply. Requires ANTHROPIC_API_KEY to be configured.
      </p>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.35rem" }}>
          Page to edit
        </label>
        <select
          value={pageId}
          onChange={(e) => {
            setPageId(e.target.value);
            setMessages([]);
            setProposal(null);
            setSavedNotice(null);
          }}
          style={{ padding: "0.5rem", minWidth: 280 }}
        >
          <option value="">+ New page</option>
          {pages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} ({p.slug})
            </option>
          ))}
        </select>

        {isNewPage && (
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <input
              placeholder="Working title (optional hint for the agent)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ padding: "0.5rem", flex: 1 }}
            />
            <input
              placeholder="Working slug (optional)"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              style={{ padding: "0.5rem", flex: 1 }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: "1rem",
          minHeight: 200,
          marginBottom: "1rem",
          background: "#fafafa",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
            Try: &quot;Create a landing page for the AI Fluency Cohort with a hero, three feature
            cards, and a closing CTA.&quot;
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "0.75rem" }}>
            <strong style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#6b7280" }}>
              {m.role === "user" ? (isNewPage ? newTitle || "You" : "You") : "Agent"}
            </strong>
            <p style={{ margin: "0.15rem 0 0", whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>{m.content}</p>
          </div>
        ))}
        {loading && <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Thinking…</p>}
      </div>

      {error && (
        <p style={{ color: "#b91c1c", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</p>
      )}
      {savedNotice && (
        <p style={{ color: "#15803d", fontSize: "0.85rem", marginBottom: "1rem" }}>{savedNotice}</p>
      )}

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Describe what you want on the page…"
          style={{ flex: 1, padding: "0.6rem" }}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding: "0.6rem 1.25rem" }}>
          Send
        </button>
      </div>

      {proposal && (
        <div style={{ border: "1px solid #c9a84c", borderRadius: 8, padding: "1rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
            Proposed page: {proposal.title} ({proposal.slug})
          </p>
          <ol style={{ paddingLeft: "1.2rem", marginBottom: "1rem", fontSize: "0.875rem" }}>
            {proposal.blocks.map((b, i) => (
              <li key={i}>{blockSummary(b)}</li>
            ))}
          </ol>
          <button onClick={applyProposal} disabled={loading} style={{ padding: "0.6rem 1.25rem" }}>
            Apply — save as draft
          </button>
        </div>
      )}
    </div>
  );
}
