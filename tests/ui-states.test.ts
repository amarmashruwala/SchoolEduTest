import { describe, expect, it } from "vitest";
import { getUiStateMessage, type SystemUiState } from "@/lib/ui-states";

const ALL_STATES: SystemUiState[] = [
  "empty_curriculum",
  "unsupported_speech",
  "denied_microphone",
  "quota_exceeded",
  "expired_session",
  "offline",
  "reconnecting",
  "provider_blocked",
];

describe("system UI state messages", () => {
  it("provides calm, non-empty titles and descriptions for every required state", () => {
    for (const state of ALL_STATES) {
      const msg = getUiStateMessage(state);
      expect(msg.state).toBe(state);
      expect(msg.title.length).toBeGreaterThan(5);
      expect(msg.description.length).toBeGreaterThan(15);
    }
  });
});
