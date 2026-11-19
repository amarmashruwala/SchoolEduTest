import Link from "next/link";

export default function StudentHomeworkPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Homework</h1>
          <p className="mt-1 text-base text-slate-700">
            Approved practice tasks assigned from your completed lessons.
          </p>
        </div>
        <Link
          href="/student"
          className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
        >
          Back to Student Home
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-base text-slate-700">
          No pending homework right now.
        </p>
      </div>
    </div>
  );
}
