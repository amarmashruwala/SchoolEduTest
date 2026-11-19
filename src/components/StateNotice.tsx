import Link from "next/link";
import { getUiStateMessage, type SystemUiState } from "@/lib/ui-states";

interface StateNoticeProps {
  state: SystemUiState;
  actionHref?: string;
}

const SEVERITY_STYLES = {
  info: "border-indigo-200 bg-indigo-50 text-indigo-950",
  warning: "border-amber-300 bg-amber-50 text-amber-950",
  error: "border-rose-300 bg-rose-50 text-rose-950",
} as const;

export function StateNotice({ state, actionHref }: StateNoticeProps) {
  const msg = getUiStateMessage(state);
  const role = msg.severity === "error" ? "alert" : "status";

  return (
    <div
      role={role}
      className={`rounded-xl border p-5 ${SEVERITY_STYLES[msg.severity]}`}
    >
      <h2 className="text-lg font-semibold">{msg.title}</h2>
      <p className="mt-1.5 text-base leading-relaxed">{msg.description}</p>
      {msg.actionLabel && actionHref && (
        <div className="mt-4">
          <Link
            href={actionHref}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            {msg.actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
