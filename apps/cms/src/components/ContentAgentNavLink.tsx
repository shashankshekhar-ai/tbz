import Link from "next/link";

export function ContentAgentNavLink() {
  return (
    <div style={{ padding: "0 1rem", marginTop: "0.5rem" }}>
      <Link href="/admin/content-agent" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
        📝 Content Agent
      </Link>
    </div>
  );
}
