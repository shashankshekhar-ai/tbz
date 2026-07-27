import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Welcome{user?.firstName ? `, ${user.firstName}` : ""}
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Your AI Readiness overview will appear here once the assessment is available.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="border rounded-lg p-5">
          <p className="text-xs text-gray-500 mb-1">AI score</p>
          <p className="text-2xl font-semibold text-gray-300">—</p>
        </div>
        <div className="border rounded-lg p-5 sm:col-span-2">
          <p className="text-xs text-gray-500 mb-1">Top recommendations</p>
          <p className="text-sm text-gray-400">Not available yet — assessment is in planning.</p>
        </div>
      </div>
    </div>
  );
}
