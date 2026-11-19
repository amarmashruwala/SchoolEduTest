import Link from "next/link";

export default function ParentConsentPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <h1 className="text-2xl font-bold text-slate-900">
        Parental Consent &amp; AI/Voice Disclosures
      </h1>
      <p className="text-base leading-relaxed text-slate-700">
        Real child AI access remains blocked until provider eligibility is
        verified and an approved verifiable parental consent flow is configured.
        A simple checkbox is not treated as verifiable parental consent.
      </p>

      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>
          <strong>AI Tutor:</strong> Disclosed as an AI companion. Currently
          locked to synthetic demo mode.
        </li>
        <li>
          <strong>Browser Voice:</strong> Browser SpeechRecognition may send
          audio to the browser vendor&apos;s remote service. Text-only is always
          available.
        </li>
        <li>
          <strong>Revocation:</strong> Revoking consent immediately blocks new
          AI/voice requests and ends active sessions.
        </li>
      </ul>

      <Link
        href="/parent"
        className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
      >
        Back to Parent Dashboard
      </Link>
    </div>
  );
}
