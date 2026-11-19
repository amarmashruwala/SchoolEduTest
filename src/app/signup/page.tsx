import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <h1 className="text-2xl font-bold text-slate-900">
        Parent Account Sign Up
      </h1>
      <p className="mt-2 text-sm text-slate-700">
        Only verified adults may create accounts. Child profiles are created
        inside the parent dashboard with no child email required.
      </p>

      <form className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-semibold text-slate-800"
          >
            Adult Email
          </label>
          <input
            id="signup-email"
            type="email"
            disabled
            placeholder="parent@example.com"
            className="mt-1 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base"
          />
        </div>

        <button
          type="button"
          disabled
          className="min-h-[44px] w-full rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white opacity-60"
        >
          Sign Up (Available in Phase 3)
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-700">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-indigo-800 underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
