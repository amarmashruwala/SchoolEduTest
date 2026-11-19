import { describe, expect, it } from "vitest";
import {
  getPublicRuntimeFlags,
  isLiveChildAiAllowed,
  parseServerEnv,
} from "@/lib/env";

describe("server env validation & fail-closed gates", () => {
  it("defaults to MOCK_AI=true and child/provider gates false", () => {
    const env = parseServerEnv({});
    expect(env.MOCK_AI).toBe(true);
    expect(env.CHILD_AI_ENABLED).toBe(false);
    expect(env.PROVIDER_ELIGIBILITY_APPROVED).toBe(false);
    expect(isLiveChildAiAllowed(env)).toBe(false);
  });

  it("blocks live child AI if any gate or key/model is missing", () => {
    const missingApproval = parseServerEnv({
      MOCK_AI: "false",
      CHILD_AI_ENABLED: "true",
      PROVIDER_ELIGIBILITY_APPROVED: "false",
      GOOGLE_GENERATIVE_AI_API_KEY: "test-key",
      GEMINI_MODEL: "gemini-2.5-flash",
    });
    expect(isLiveChildAiAllowed(missingApproval)).toBe(false);

    const missingModel = parseServerEnv({
      MOCK_AI: "false",
      CHILD_AI_ENABLED: "true",
      PROVIDER_ELIGIBILITY_APPROVED: "true",
      GOOGLE_GENERATIVE_AI_API_KEY: "test-key",
      GEMINI_MODEL: "",
    });
    expect(isLiveChildAiAllowed(missingModel)).toBe(false);
  });

  it("allows live AI only when all gates, key, and model are explicitly set", () => {
    const allowed = parseServerEnv({
      MOCK_AI: "false",
      CHILD_AI_ENABLED: "true",
      PROVIDER_ELIGIBILITY_APPROVED: "true",
      GOOGLE_GENERATIVE_AI_API_KEY: "test-key",
      GEMINI_MODEL: "gemini-2.5-flash",
    });
    expect(isLiveChildAiAllowed(allowed)).toBe(true);
  });

  it("never exposes privileged secrets in public runtime flags", () => {
    const flags = getPublicRuntimeFlags({
      GOOGLE_GENERATIVE_AI_API_KEY: "super-secret",
      SUPABASE_SERVICE_ROLE_KEY: "service-secret",
    });
    const serialized = JSON.stringify(flags);
    expect(serialized).not.toContain("super-secret");
    expect(serialized).not.toContain("service-secret");
  });
});
