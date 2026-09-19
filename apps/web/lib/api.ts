const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function apiFetch(path: string) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const getLeads = () => apiFetch("/leads?limit=50");
export const getFormSubmissions = () => apiFetch("/forms?limit=50");
export const getResourceDownloads = () => apiFetch("/resources?limit=50");
export const getAuditLogs = () => apiFetch("/admin/audit-logs?limit=50");
export const getIntegrationEvents = () => apiFetch("/admin/integration-events?limit=50");

export async function submitResourceDownload(payload: {
  email: string;
  resource_slug: string;
  resource_title?: string;
  first_name?: string;
  company?: string;
}): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/resources/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, source: "resource_gate" }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
