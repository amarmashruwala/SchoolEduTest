import Link from "next/link";

interface DemoBannerProps {
  mockAi: boolean;
  providerApproved: boolean;
}

export function DemoBanner({ mockAi, providerApproved }: DemoBannerProps) {
  if (!mockAi && providerApproved) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="border-b border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-950"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
        <p className="font-medium">
          <span className="mr-2 inline-block rounded bg-amber-200 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-950">
            Demo Mode
          </span>
          Synthetic / Adult-Only Preview — Live child AI is disabled pending
          provider eligibility &amp; textbook confirmation.
        </p>
        <Link
          href="/settings/privacy"
          className="font-semibold text-indigo-800 underline underline-offset-2 hover:text-indigo-950"
        >
          Privacy &amp; Gates
        </Link>
      </div>
    </div>
  );
}
