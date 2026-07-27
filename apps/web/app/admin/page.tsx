import type { Metadata } from "next";
import {
  getAuditLogs,
  getFormSubmissions,
  getIntegrationEvents,
  getLeads,
  getResourceDownloads,
} from "@/lib/api";

export const metadata: Metadata = {
  title: "Admin | The Bradbury Group",
  robots: { index: false, follow: false },
};

type Row = Record<string, unknown>;

function Table({ title, rows, columns }: { title: string; rows: Row[]; columns: string[] }) {
  return (
    <div className="border rounded-lg overflow-hidden mb-10">
      <p className="font-semibold text-sm px-4 py-3 bg-gray-50 border-b">
        {title} <span className="text-gray-400 font-normal">({rows.length})</span>
      </p>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400 px-4 py-4">No records yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                {columns.map((col) => (
                  <th key={col} className="px-4 py-2 font-medium whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-2 whitespace-nowrap max-w-xs truncate">
                      {String(row[col] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default async function AdminPage() {
  const [leads, forms, resources, auditLogs, integrationEvents] = await Promise.all([
    getLeads(),
    getFormSubmissions(),
    getResourceDownloads(),
    getAuditLogs(),
    getIntegrationEvents(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-2">Admin</h1>
      <p className="text-sm text-gray-500 mb-2">
        Live read-only view of leads, submissions, downloads, and integration dispatch. Not indexed for search.
      </p>
      <p className="text-xs text-amber-600 mb-10">
        Not protected by real auth yet — API admin routes bypass Clerk in local dev (DEBUG=true, no CLERK_SECRET_KEY).
        Do not expose this route publicly until Phase 7 Clerk keys are configured.
      </p>

      <Table
        title="Leads"
        rows={leads}
        columns={["id", "email", "first_name", "company", "source", "created_at"]}
      />
      <Table
        title="Form submissions"
        rows={forms}
        columns={["id", "lead_id", "form_type", "hubspot_synced", "n8n_triggered", "created_at"]}
      />
      <Table
        title="Resource downloads"
        rows={resources}
        columns={["id", "lead_id", "resource_slug", "access_token", "created_at"]}
      />
      <Table
        title="Integration events"
        rows={integrationEvents}
        columns={["id", "target", "event_type", "status", "error", "created_at"]}
      />
      <Table
        title="Audit logs"
        rows={auditLogs}
        columns={["id", "actor_id", "action", "resource_type", "resource_id", "created_at"]}
      />
    </div>
  );
}
