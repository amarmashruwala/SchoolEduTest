import Link from "next/link";

export default function StudentProgressPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Progress</h1>
          <p className="mt-1 text-base text-slate-700">
            Supportive feedback and chapter coverage based on your practice
            attempts.
          </p>
        </div>
        <Link
          href="/student"
          className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
        >
          Back to Student Home
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">
            Chapter Coverage
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            0 published chapters started.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">
            Next Recommended Step
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Try the synthetic demo tutor room while textbook ingestion is
            pending.
          </p>
        </div>
      </div>
    </div>
  );
}
