import Link from "next/link";

export default function ParentDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Parent Dashboard
          </h1>
          <p className="mt-1 text-base text-slate-700">
            Manage child profiles, consent, and evidence-based learning reports.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/parent/children/new"
            className="inline-flex min-h-[44px] items-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Add Child Profile
          </Link>
          <Link
            href="/parent/consent"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Consent &amp; Disclosures
          </Link>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-semibold text-slate-900">
          Child Profiles (Shell)
        </h2>
        <p className="mt-2 text-base text-slate-700">
          No child profiles yet. Database persistence and family-isolated RLS
          are wired in Phase 3.
        </p>
        <div className="mt-4">
          <Link
            href="/parent/children/demo-child"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-900 hover:bg-indigo-100"
          >
            Preview Sample Child Report Shell
          </Link>
        </div>
      </section>
    </div>
  );
}
