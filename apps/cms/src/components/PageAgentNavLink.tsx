import Link from "next/link";

export function PageAgentNavLink() {
  return (
    <div style={{ padding: "0 1rem", marginTop: "0.5rem" }}>
      <Link href="/admin/page-agent" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
        🤖 Page Agent
      </Link>
    </div>
  );
}
