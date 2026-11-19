# Architecture

## Core
Next.js App Router with TypeScript, Tailwind, schema validation, Supabase Postgres/Auth, Vercel-compatible request handlers. Use an official maintained Google Gen AI SDK verified at implementation. Model name comes from server env GEMINI_MODEL; fail explicitly when unavailable rather than assuming an old model.

## Turn pipeline
Browser speech recognition or typed text → authenticated POST session turn → consent/provider/session/rate-limit guards → chapter-scoped retrieval → Gemini text response → structured-output validation → deterministic state/assessment checks → transactional persistence → text to browser → browser speech synthesis.

No LiveKit/VDO.Ninja is needed because there is no remote human participant or media-room transport in v1. Browser SpeechRecognition performs transcription when available; MediaRecorder alone does not transcribe and is not a free STT fallback. Do not implement an audio-upload fallback without a separately approved STT service.

## Interfaces
TutorModel.generateTurn, RetrievalProvider.search, SpeechInput.start/stop, SpeechOutput.speak/cancel, ProgressService.recordEvidence. A mock TutorModel returns deterministic fixtures. Provider-specific code stays server-side and outside pedagogical logic.

## Retrieval
Start with chapter-scoped SQL full-text search and concept IDs. Store source locator/page and edition. Filter published/approved content before querying. Bound context size. Add pgvector later only after embedding availability and terms are confirmed. Never load the entire textbook into every request.

## Runtime
No in-memory authoritative sessions or rate limits. Store server-owned session end time and state in Postgres. Functions should be short-lived; use bounded generation and request cancellation. Stream text only if useful; validation and privileged writes must still be server-controlled.
