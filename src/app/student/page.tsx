import Link from "next/link";

export default function StudentHomePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
          Student Workspace · Demo Shell
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Welcome back
        </h1>
        <p className="mt-2 text-base text-slate-700">
          Pick up where you left off, browse chapters, or check pending
          homework. Sessions have a 60-minute cap with breaks anytime.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/student/session/demo-1"
            className="inline-flex min-h-[44px] items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Enter Demo Tutor Room
          </Link>
          <Link
            href="/student/chapters"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Browse Chapters
          </Link>
          <Link
            href="/student/homework"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Homework
          </Link>
          <Link
            href="/student/progress"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            My Progress
          </Link>
        </div>
      </div>
    </div>
  );
}
