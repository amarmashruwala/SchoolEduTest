import Link from "next/link";

export default function NewChildPage() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <h1 className="text-2xl font-bold text-slate-900">
        Create Child Profile
      </h1>
      <p className="mt-2 text-sm text-slate-700">
        Only a nickname and grade are collected. No child email, phone number,
        photo, or exact date of birth is required.
      </p>

      <form className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="child-nickname"
            className="block text-sm font-semibold text-slate-800"
          >
            Child Nickname
          </label>
          <input
            id="child-nickname"
            type="text"
            disabled
            placeholder="e.g. Sam"
            className="mt-1 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base"
          />
        </div>

        <div>
          <label
            htmlFor="child-grade"
            className="block text-sm font-semibold text-slate-800"
          >
            Grade (Provisional Pilot)
          </label>
          <input
            id="child-grade"
            type="text"
            disabled
            value="Grade 6"
            readOnly
            className="mt-1 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled
            className="min-h-[44px] rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white opacity-60"
          >
            Save Profile (Phase 3)
          </button>
          <Link
            href="/parent"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Back to Parent Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
}
