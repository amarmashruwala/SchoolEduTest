import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
      <p className="mt-2 text-sm text-slate-700">
        Parent account authentication and child device pairing codes are wired
        in Phase 3 (Supabase Auth). Children never sign up publicly.
      </p>

      <form className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="login-email"
            className="block text-sm font-semibold text-slate-800"
          >
            Parent Email
          </label>
          <input
            id="login-email"
            type="email"
            disabled
            placeholder="parent@example.com"
            className="mt-1 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base"
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="block text-sm font-semibold text-slate-800"
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            disabled
            placeholder="••••••••"
            className="mt-1 min-h-[44px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base"
          />
        </div>

        <button
          type="button"
          disabled
          className="min-h-[44px] w-full rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white opacity-60"
        >
          Sign In (Available in Phase 3)
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-700">
        New parent?{" "}
        <Link
          href="/signup"
          className="font-semibold text-indigo-800 underline underline-offset-2"
        >
          Create parent account
        </Link>
      </p>
    </div>
  );
}
