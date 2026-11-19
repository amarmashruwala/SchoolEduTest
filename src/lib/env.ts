import { z } from "zod";

const booleanString = z
  .enum(["true", "false"])
  .optional()
  .transform((val) => val === "true");

const booleanStringDefaultTrue = z
  .enum(["true", "false"])
  .optional()
  .transform((val) => (val === undefined ? true : val === "true"));

export const serverEnvSchema = z.object({
  APP_URL: z.string().url().default("http://localhost:3000"),
  MOCK_AI: booleanStringDefaultTrue,
  CHILD_AI_ENABLED: booleanString,
  PROVIDER_ELIGIBILITY_APPROVED: booleanString,
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional().default(""),
  GEMINI_MODEL: z.string().optional().default(""),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional().default(""),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().optional().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseServerEnv(
  raw: Record<string, string | undefined> = process.env
): ServerEnv {
  return serverEnvSchema.parse({
    APP_URL: raw.APP_URL || "http://localhost:3000",
    MOCK_AI: raw.MOCK_AI,
    CHILD_AI_ENABLED: raw.CHILD_AI_ENABLED,
    PROVIDER_ELIGIBILITY_APPROVED: raw.PROVIDER_ELIGIBILITY_APPROVED,
    GOOGLE_GENERATIVE_AI_API_KEY: raw.GOOGLE_GENERATIVE_AI_API_KEY,
    GEMINI_MODEL: raw.GEMINI_MODEL,
    NEXT_PUBLIC_SUPABASE_URL: raw.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      raw.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    SUPABASE_SERVICE_ROLE_KEY: raw.SUPABASE_SERVICE_ROLE_KEY,
  });
}

export function isLiveChildAiAllowed(env: ServerEnv): boolean {
  return (
    !env.MOCK_AI &&
    env.CHILD_AI_ENABLED &&
    env.PROVIDER_ELIGIBILITY_APPROVED &&
    env.GOOGLE_GENERATIVE_AI_API_KEY.trim().length > 0 &&
    env.GEMINI_MODEL.trim().length > 0
  );
}

export interface PublicRuntimeFlags {
  mockAi: boolean;
  childAiEnabled: boolean;
  providerEligibilityApproved: boolean;
  appName: string;
  tutorName: string;
}

export function getPublicRuntimeFlags(
  raw: Record<string, string | undefined> = process.env
): PublicRuntimeFlags {
  const env = parseServerEnv(raw);
  return {
    mockAi: env.MOCK_AI,
    childAiEnabled: env.CHILD_AI_ENABLED,
    providerEligibilityApproved: env.PROVIDER_ELIGIBILITY_APPROVED,
    appName: "LearnLoop (Working Name)",
    tutorName: "Aanya (AI Tutor)",
  };
}
