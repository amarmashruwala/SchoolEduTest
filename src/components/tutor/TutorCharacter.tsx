"use client";

export type TutorCharacterState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking";

interface TutorCharacterProps {
  name?: string;
  state: TutorCharacterState;
}

const STATE_LABELS: Record<TutorCharacterState, string> = {
  idle: "Ready to learn",
  listening: "Listening to you",
  thinking: "Thinking...",
  speaking: "Speaking",
};

const RING_STYLES: Record<TutorCharacterState, string> = {
  idle: "border-indigo-200 bg-indigo-50",
  listening: "border-teal-500 bg-teal-50 ring-4 ring-teal-200",
  thinking: "border-amber-400 bg-amber-50",
  speaking: "border-indigo-500 bg-indigo-50 ring-4 ring-indigo-200",
};

export function TutorCharacter({
  name = "Aanya (AI Tutor)",
  state,
}: TutorCharacterProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative flex h-28 w-28 items-center justify-center rounded-full border-2 transition-colors ${RING_STYLES[state]}`}
        role="img"
        aria-label={`${name} avatar: ${STATE_LABELS[state]}`}
      >
        <svg
          viewBox="0 0 100 100"
          className={`h-22 w-22 ${
            state === "idle" || state === "listening"
              ? "animate-tutor-breathe"
              : ""
          }`}
          aria-hidden="true"
        >
          {/* Head / Backdrop */}
          <circle cx="50" cy="50" r="38" fill="#4338CA" />
          {/* Hair / Top accent */}
          <path
            d="M18 44 C20 20, 80 20, 82 44 C76 32, 24 32, 18 44 Z"
            fill="#1E1B4B"
          />
          {/* Face */}
          <circle cx="50" cy="54" r="26" fill="#FDE68A" />
          {/* Eyes */}
          <circle cx="40" cy="50" r="3.2" fill="#1E293B" />
          <circle cx="60" cy="50" r="3.2" fill="#1E293B" />

          {/* Mouth varies by state */}
          {state === "speaking" ? (
            <ellipse
              cx="50"
              cy="64"
              rx="6"
              ry="4.5"
              fill="#0F766E"
              className="animate-tutor-speak"
            />
          ) : state === "thinking" ? (
            <line
              x1="44"
              y1="64"
              x2="56"
              y2="64"
              stroke="#1E293B"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M42 62 Q50 69 58 62"
              fill="none"
              stroke="#1E293B"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-slate-900">{name}</p>
        <p className="text-xs font-medium text-teal-800">
          {STATE_LABELS[state]}
        </p>
      </div>
    </div>
  );
}
