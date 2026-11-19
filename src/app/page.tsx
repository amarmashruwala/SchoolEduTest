import Link from "next/link";
import { StateNotice } from "@/components/StateNotice";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
          Personal AI Tuition Companion · Provisional Grade 6 English
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Calm, active textbook learning at your own pace
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg">
          One-to-one guided practice with an AI study companion, parent-managed
          child access, browser voice or text input, and a 60-minute session cap.
          Complements school; does not replace teachers.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/student/session/demo-1"
            className="inline-flex min-h-[44px] items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Open Demo Tutor Room
          </Link>
          <Link
            href="/parent"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Parent Dashboard
          </Link>
          <Link
            href="/student"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Student Home
          </Link>
        </div>
      </section>

      <StateNotice state="provider_blocked" />
    </div>
  );
}
