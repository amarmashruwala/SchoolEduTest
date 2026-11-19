import Link from "next/link";

export default async function ChildDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
            Child Profile · {id}
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Evidence-Based Progress Report (Shell)
          </h1>
        </div>

        <Link
          href="/parent"
          className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
        >
          Back to Parent Dashboard
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-600">Sessions</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">0</p>
          <p className="mt-1 text-xs text-slate-600">Insufficient evidence</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-600">
            Provisional Mastery
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            Not yet assessed
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Requires 3+ independent attempts across 2+ sessions
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-600">
            Observed Practice
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">0 attempts</p>
          <p className="mt-1 text-xs text-slate-600">No raw transcripts stored</p>
        </div>
      </div>
    </div>
  );
}
