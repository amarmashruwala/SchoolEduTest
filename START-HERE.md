# Start Here

## Local setup
Extract this directory into a new Git repository. Keep AGENTS.md at repository root. Codex or Hermes should explicitly read it; do not assume every agent auto-loads it. Read prompts/00-start.md first.

## Required before real child use
Confirm textbook title, edition, board, grade, permissions and selected pilot chapters. No textbook PDF is available in the supplied package. Uploaded conversation transcripts are not textbooks.

Verify current Gemini API terms on apps directed at or accessed by children and regional free-tier data-use conditions. Parental consent does not override a provider prohibition. Until a compatible arrangement is documented, run synthetic/adult-only demos with MOCK_AI=true and block child-facing model requests on the server. If free Gemini cannot support this product, stop and report the blocker; do not silently substitute a paid service.

Verify Vercel plan eligibility for the intended commercial use, function limits, Supabase limits, auth provider child-account conditions and speech-service data flows. Free tier means a budget objective, not guaranteed availability or zero operating cost.

## Working defaults
LearnLoop and Aanya are placeholders only, not approved names or cleared trademarks. Grade 6 English is the current pilot assumption; content metadata must determine final board and textbook. Educational claims and exam predictions are not permitted.

## Setup inputs
GOOGLE_GENERATIVE_AI_API_KEY, GEMINI_MODEL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SERVICE_ROLE_KEY (only if strictly needed server-side), APP_URL, MOCK_AI, CHILD_AI_ENABLED, PROVIDER_ELIGIBILITY_APPROVED.

Default MOCK_AI=true, CHILD_AI_ENABLED=false and PROVIDER_ELIGIBILITY_APPROVED=false. Never commit real secrets. Never use NEXT_PUBLIC for privileged secrets.

## Run sequence
Use prompts 01 through 08 in order. Each prompt requires a plan, implementation, tests, report and approval before advancing. Do not overwrite these specifications with generated app documentation.
