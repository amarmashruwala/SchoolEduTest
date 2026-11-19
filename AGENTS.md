# Repository Agent Instructions

## Authority
Read README.md, START-HERE.md, all docs and the current phase prompt. This standalone education project excludes unrelated business context. docs/01-decisions.md supersedes earlier chat/package technology choices. Record new decisions in docs/15-open-decisions.md; never silently change the stack.

## Non-negotiable constraints
Use Gemini free tier only if current terms allow the target users and data processing. Server-side gate all child AI calls until provider eligibility is verified. Default to deterministic mock/adult-only demos, clearly labelled. No child data may be sent to an unapproved model or speech service.

Use Next.js/TypeScript/Tailwind, Supabase Postgres/Auth and Vercel. No media server, LiveKit, VDO.Ninja, OpenAI API, paid TTS/avatar or payments in v1. No persistent worker or long-lived websocket on Vercel request functions. Browser voice is turn-based STT → text model → TTS, not native speech-to-speech.

## Scope and truthfulness
One subject, provisional Grade 6 English, one approved textbook, 3–5 pilot chapters. Missing textbook must yield an empty/unavailable state, never invented chapters presented as official content. Original sample lessons may exist only under fixtures/demo, labelled synthetic and inaccessible as published curriculum.

Do not guarantee marks, predict exam questions, infer IQ/emotions/attention from cameras, or treat time spent as mastery. Do not claim universal 3–4 minute attention spans. Interaction cadence is a design hypothesis, not a clinical fact.

## Security and delivery
Server-authorize every child, parent, chapter, session and tool request. Use Supabase RLS and test cross-family isolation. No public signup for children, no required child email. Do not expose answers/rubrics before submission. Never trust model output for permissions, scores, timer authority or database writes. Validate with schemas.

Use maintained SDKs verified against official current docs; never invent model IDs, API methods or supported browser features. Set timeouts, budgets, retries with jitter and quota-aware errors. Never log prompts/transcripts by default.

Work in reviewable phases. Run unit/integration/type/lint/build checks. Report checks actually run; if blocked, state why. Never report production-ready solely because build passes. No deployment, destructive migration or external write without owner approval.
