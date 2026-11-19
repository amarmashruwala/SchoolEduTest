export type SystemUiState =
  | "empty_curriculum"
  | "unsupported_speech"
  | "denied_microphone"
  | "quota_exceeded"
  | "expired_session"
  | "offline"
  | "reconnecting"
  | "provider_blocked";

export interface UiStateMessage {
  state: SystemUiState;
  severity: "info" | "warning" | "error";
  title: string;
  description: string;
  actionLabel?: string;
}

export const UI_STATE_MESSAGES: Record<SystemUiState, UiStateMessage> = {
  empty_curriculum: {
    state: "empty_curriculum",
    severity: "info",
    title: "No published textbook chapters yet",
    description:
      "A confirmed, rights-cleared textbook has not been ingested yet. Official lessons will appear here after owner review and approval.",
    actionLabel: "View Demo Tutor Room",
  },
  unsupported_speech: {
    state: "unsupported_speech",
    severity: "info",
    title: "Browser voice input is not supported here",
    description:
      "Your current browser does not support SpeechRecognition. You can complete the entire lesson using typed responses.",
  },
  denied_microphone: {
    state: "denied_microphone",
    severity: "warning",
    title: "Microphone access was not granted",
    description:
      "Microphone permission is optional. Type your answer below or enable microphone access in browser settings whenever you choose.",
  },
  quota_exceeded: {
    state: "quota_exceeded",
    severity: "warning",
    title: "Session usage limit reached",
    description:
      "The tutor request budget for this period has been reached. Your progress is saved and you can resume later.",
  },
  expired_session: {
    state: "expired_session",
    severity: "info",
    title: "60-minute session time complete",
    description:
      "Your 60-minute session cap has ended and your checkpoint is saved. Take a break and start a new session when ready.",
    actionLabel: "Return to Student Home",
  },
  offline: {
    state: "offline",
    severity: "warning",
    title: "You appear to be offline",
    description:
      "Check your internet connection. Avoid closing this tab until your latest checkpoint finishes syncing.",
  },
  reconnecting: {
    state: "reconnecting",
    severity: "info",
    title: "Reconnecting to session...",
    description:
      "Restoring your last saved checkpoint. Your timer continues on the server.",
  },
  provider_blocked: {
    state: "provider_blocked",
    severity: "error",
    title: "Live child AI is disabled",
    description:
      "Provider age/data-use eligibility is not approved (CHILD_AI_ENABLED=false). Only synthetic, adult-supervised demo mode is active.",
  },
};

export function getUiStateMessage(state: SystemUiState): UiStateMessage {
  return UI_STATE_MESSAGES[state];
}
