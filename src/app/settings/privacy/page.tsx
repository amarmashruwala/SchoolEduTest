import Link from "next/link";
import { getPublicRuntimeFlags } from "@/lib/env";

export default function PrivacySettingsPage() {
  const flags = getPublicRuntimeFlags();

  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <h1 className="text-2xl font-bold text-slate-900">
        Privacy, Safety &amp; Provider Gates
      </h1>
      <p className="text-base leading-relaxed text-slate-700">
        All child-facing AI requests are server-gated and fail closed until
        provider eligibility, verifiable parental consent, and approved
        curriculum are confirmed.
      </p>

      <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50 px-4">
        <div className="flex items-center justify-between py-3">
          <dt className="text-sm font-semibold text-slate-800">MOCK_AI</dt>
          <dd className="text-sm font-mono text-slate-900">
            {String(flags.mockAi)}
          </dd>
        </div>
        <div className="flex items-center justify-between py-3">
          <dt className="text-sm font-semibold text-slate-800">
            CHILD_AI_ENABLED
          </dt>
          <dd className="text-sm font-mono text-slate-900">
            {String(flags.childAiEnabled)}
          </dd>
        </div>
        <div className="flex items-center justify-between py-3">
          <dt className="text-sm font-semibold text-slate-800">
            PROVIDER_ELIGIBILITY_APPROVED
          </dt>
          <dd className="text-sm font-mono text-slate-900">
            {String(flags.providerEligibilityApproved)}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/parent"
          className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
        >
          Parent Dashboard
        </Link>
      </div>
    </div>
  );
}
