"use client";

import { useEffect, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ContentKind = "post" | "resource" | "case-study";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Proposal = Record<string, any>;
type DocOption = { id: string; title: string; slug: string };

const KIND_LABEL: Record<ContentKind, string> = {
  post: "Blog post",
  resource: "Resource",
  "case-study": "Case study",
};

const KIND_COLLECTION: Record<ContentKind, string> = {
  post: "posts",
  resource: "resources",
  "case-study": "case-studies",
};

const KIND_EXAMPLE: Record<ContentKind, string> = {
  post: 'Try: "Write a post on why AI fluency beats AI tool adoption, 600 words, upbeat tone."',
  resource: 'Try: "Draft a checklist resource for board-level AI risk questions."',
  "case-study": 'Try: "Draft a case study for a manufacturing client that cut onboarding time 40% using the Solomon Engine."',
};

function summarizeValue(value: unknown): string {
  if (value == null) return "";
  if (Array.isArray(value)) return `${value.length} item(s)`;
  const str = String(value);
  return str.length > 80 ? `${str.slice(0, 80)}…` : str;
}

export function ContentAgentView() {
  const [kind, setKind] = useState<ContentKind>("post");
  const [docs, setDocs] = useState<DocOption[]>([]);
  const [docId, setDocId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    setDocId("");
    setMessages([]);
    setProposal(null);
    setSavedNotice(null);
    fetch(`/api/${KIND_COLLECTION[kind]}?limit=200&depth=0`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const rawDocs = (data?.docs ?? []) as Array<{ id: string; title: string; slug: string }>;
        setDocs(rawDocs.map((d) => ({ id: d.id, title: d.title, slug: d.slug })));
      })
      .catch(() => setDocs([]));
  }, [kind]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setSavedNotice(null);

    try {
      const resp = await fetch("/api/content-agent/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, docId: docId || undefined, messages: nextMessages }),
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
      const resp = await fetch("/api/content-agent/apply", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, docId: docId || undefined, proposal }),
      });
      const body = await resp.json();
      if (!resp.ok) {
        setError(body.error ?? "Failed to save entry");
        return;
      }
      setDocId(body.id);
      setSavedNotice(`Saved as draft — /admin/collections/${KIND_COLLECTION[kind]}/${body.id}`);
      setProposal(null);
    } catch {
      setError("Network error saving the entry");
    } finally {
      setLoading(false);
    }
  }

  const isNewDoc = docId === "";

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.25rem" }}>Content Agent</h1>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        Describe a blog post, resource, or case study in plain English. The agent proposes the full
        entry — nothing saves until you click Apply. Requires ANTHROPIC_API_KEY to be configured.
      </p>

      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.35rem" }}>
            Content type
          </label>
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as ContentKind)}
            style={{ padding: "0.5rem", minWidth: 180 }}
          >
            {(Object.keys(KIND_LABEL) as ContentKind[]).map((k) => (
              <option key={k} value={k}>
                {KIND_LABEL[k]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.35rem" }}>
            Entry to edit
          </label>
          <select
            value={docId}
            onChange={(e) => {
              setDocId(e.target.value);
              setMessages([]);
              setProposal(null);
              setSavedNotice(null);
            }}
            style={{ padding: "0.5rem", minWidth: 280 }}
          >
            <option value="">+ New {KIND_LABEL[kind].toLowerCase()}</option>
            {docs.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.slug})
              </option>
            ))}
          </select>
        </div>
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
          <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>{KIND_EXAMPLE[kind]}</p>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "0.75rem" }}>
            <strong style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#6b7280" }}>
              {m.role === "user" ? "You" : "Agent"}
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
          placeholder={`Describe the ${KIND_LABEL[kind].toLowerCase()}…`}
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
            Proposed {KIND_LABEL[kind].toLowerCase()}: {String(proposal.title ?? "")} ({String(proposal.slug ?? "")}
            {isNewDoc ? ", new" : ""})
          </p>
          <ul style={{ paddingLeft: "1.2rem", marginBottom: "1rem", fontSize: "0.875rem" }}>
            {Object.entries(proposal)
              .filter(([key]) => key !== "title" && key !== "slug")
              .map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {summarizeValue(value)}
                </li>
              ))}
          </ul>
          <button onClick={applyProposal} disabled={loading} style={{ padding: "0.6rem 1.25rem" }}>
            Apply — save as draft
          </button>
        </div>
      )}
    </div>
  );
}
