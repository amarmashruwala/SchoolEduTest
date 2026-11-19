

# FILE: AGENTS.md

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


# FILE: MANIFEST.md

# Package Manifest

- `AGENTS.md`
- `MANIFEST.md`
- `README.md`
- `START-HERE.md`
- `content/README.md`
- `docs/01-decisions.md`
- `docs/02-product-and-journeys.md`
- `docs/03-ui-accessibility.md`
- `docs/04-architecture.md`
- `docs/05-auth-consent-security.md`
- `docs/06-tutor-and-lesson-engine.md`
- `docs/07-assessment-progress.md`
- `docs/08-database.md`
- `docs/09-api-contracts.md`
- `docs/10-voice-and-session-timing.md`
- `docs/11-content-ingestion.md`
- `docs/12-safety-provider-and-launch-gates.md`
- `docs/13-testing-acceptance.md`
- `docs/14-roadmap-deployment.md`
- `docs/15-open-decisions.md`
- `prompts/00-start.md`
- `prompts/01-audit-and-plan.md`
- `prompts/02-scaffold-ui.md`
- `prompts/03-auth-database-consent.md`
- `prompts/04-content-retrieval.md`
- `prompts/05-text-tutor.md`
- `prompts/06-browser-voice.md`
- `prompts/07-assessment-dashboards.md`
- `prompts/08-test-and-deploy.md`
- `templates/chapter.md`


# FILE: README.md

# Education Tutor MVP

Standalone education project. No UnifiedLive branding or business-website requirements apply.

## Start here
1. Read START-HERE.md and AGENTS.md.
2. Give your coding agent prompts/00-start.md.
3. Implement one phase at a time and review the result.

## Current decisions
- Browser-based one-to-one tuition, initially Grade 6 English (provisional until textbook confirmed).
- Google Gemini Developer API free tier, subject to eligibility, age restrictions, quotas and data-use terms.
- Browser speech recognition and browser speech synthesis, with full text fallback.
- Next.js App Router, TypeScript, Tailwind; Vercel web and request-based backend.
- Supabase free-tier Postgres and Auth as the default integrated database/auth choice; verify current limits.
- Parent-managed child accounts and consent from day one.
- Default 60-minute maximum session; a chapter may span several sessions.
- No payments, social feed, school accounts, paid avatar, LiveKit or VDO.Ninja in v1.
- A simple animated tutor character preserves the tutor-room experience, not a photorealistic avatar.

This package is a build specification, not finished software or a legal/compliance certification.


# FILE: START-HERE.md

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


# FILE: content/README.md

# Approved Content

No actual textbook has been supplied with this package. Add rights-cleared reviewed chapter files here using templates/chapter.md. Do not use a meeting transcript as teaching material. Keep restricted source PDFs in private storage, not a public Git repository. Only published approved versions may be retrieved for real lessons.


# FILE: docs/01-decisions.md

# Decisions and Scope

## Confirmed user choices
Gemini free tier; browser microphone and browser voice; parent/child accounts and consent from day one; Vercel and free-tier cloud database; no payments. Standalone student education project, unrelated to the business website.

## Implementation defaults
Supabase Postgres and Auth reduce integration count. pgvector is optional, not required at the start. Begin chapter-scoped full-text search; add embeddings only with an approved provider and measurable retrieval need. Keep RetrievalProvider abstract.

Use a simple animated character with idle/listening/thinking/speaking states; paid realistic video avatar is deferred. Voice is turn-based, user-initiated, not a fully interruptible realtime model. Cancel speech output when the student starts a turn.

## Pilot boundary
One subject and one provisional grade, 3–5 chapters. Parent and student dashboards, flexible chapter order, quizzes/flashcards, short/long answers, homework, recap, saved progress, one-hour maximum with earlier exit and breaks. No school/teacher login, social sharing, messaging, photos, public profiles, exam-paper prediction or billing.

## Scope interpretation
One hour is a session cap, not a promise to finish every chapter in one hour. Never auto-restart at expiry or upsell a child. Avatar fidelity, textbook identity, board and final name remain unconfirmed.


# FILE: docs/02-product-and-journeys.md

# Product and Journeys

## Promise
A personal AI tuition companion that supports active textbook learning, revision and practice at a learner’s pace. It complements school, not replaces teachers. Claims of improved outcomes require validation.

## Parent
Sign up → verify email → review AI/voice disclosures → create child nickname and grade → record consent → set access → review evidence-based progress → revoke consent or request deletion.

## Student
Use parent-managed access → choose subject/chapter/topic or continue → preflight voice check → welcome and optional recap → choose goal → inquiry hook → short explanation → active question → feedback/reteach → practice → recap/homework → finish/resume later.

## Tutor room UI
Top bar: topic, remaining time and save/exit. Main space: animated tutor and readable lesson text. Activity panel: current question/whiteboard card. Controls: push-to-talk, stop speaking, type, simplify, repeat, example, quiz, pause and end. Mobile stacks panels without hiding the question or controls.

## Dashboards
Student: next step, chapter coverage, pending homework, supportive feedback. Parent: attendance/session duration, observed practice results, misconceptions supported by attempts, next actions. Distinguish provisional mastery from validated assessment. Do not equate microphone activity with attention.


# FILE: docs/03-ui-accessibility.md

# UI and Accessibility

Use a playful but calm learning workspace, not an infinite feed or a generic admin dashboard. Working design defaults: indigo, teal, warm neutral background; ensure accessible foreground contrast instead of assuming palette compliance. Working names are configurable.

Readable 16–18px body, clear hierarchy, 44px minimum touch targets, visible focus, keyboard operation, semantic controls, labelled errors, reduced motion, captions/text for all tutor speech. No autoplay microphone or speech on page load. Avoid screen-reader announcements of every token.

Required routes: /, /login, /signup, /parent, /parent/children/new, /parent/children/[id], /parent/consent, /student, /student/chapters, /student/session/[id], /student/homework, /student/progress, /settings/privacy.

Provide empty curriculum, unsupported speech, denied microphone, quota exceeded, expired session, offline, reconnecting and provider-blocked states. Mock mode has a persistent demo banner. Never simulate live AI without disclosure.

At first voice use disclose that browser speech recognition may use the browser vendor’s remote service. Request permission only after action and approval. Offer text throughout. No webcam, facial analysis or recording UI.


# FILE: docs/04-architecture.md

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


# FILE: docs/05-auth-consent-security.md

# Authentication, Consent and Security

Parent uses verified adult account. Child uses parent-managed nickname/profile, not a required email. For separate child-device sessions, implement one-time, short-lived parent-issued pairing codes backed by a least-privilege session; never a public nickname-only login or a permanent shared PIN. Parent reauthentication required to enter parent settings from child mode. Document the chosen implementation before building.

Every request derives identity from verified session claims; never trust body parentId/childId. Verify family ownership, role and active consent server-side. Parent DB queries cannot access other families; child queries cannot access siblings or parent settings. Use RLS with explicit policies; service-role use must not bypass ownership checks.

Consent stores purpose, policy version, timestamp, verification method/evidence reference and revocation. A checkbox is not automatically verifiable parental consent. Demonstration consent must be labelled; production child access stays blocked until the approved verification flow is configured.

Revoke consent → block new AI/voice requests immediately and end active sessions safely. Provide export and deletion request flow, with documented provider retention limitations. Do not claim instant deletion from backups/vendor logs.

Use CSRF/origin checks as applicable, secure HttpOnly cookies, least privilege, input/output schemas, login/session/LLM rate limits, redacted logs and audit events without unnecessary child text. Never include service-role keys in client bundles.


# FILE: docs/06-tutor-and-lesson-engine.md

# Tutor and Lesson Engine

Friendly AI tutor, working name Aanya. Explicitly disclose it is AI. Preferred voice en-IN when the device provides it; never promise a specific accent. Adapt from observed answers, not fixed labels such as bright/weak or unsupported cognitive diagnoses.

State machine: welcome → goal → recap/diagnostic → curiosity hook → explain → check → feedback → reteach/practice → summary → homework → closed. Skip inapplicable states. Persist current concept, evidence, pending question and next step. Ask one question at a time and wait. Aim for a participation opportunity every 60–90 seconds where appropriate; never interrupt reading, accessibility needs or a thoughtful answer with a rigid timer.

Use hints before answers, but allow explanations/model answers after a reasonable attempt, explicit request or demonstrated frustration. Re-explain differently rather than repeat. Allow reviewed original examples consistent with approved concepts, labelled as tutor examples rather than textbook quotations. Do not invent textbook facts or claim particular questions will appear in an exam.

Test-prep mode asks chapters and available time, prioritises learning objectives and practice; no probable-question guarantees. Cover essential objectives, not only a generated summary.

Tutor structured output: speechText, displayText, state, conceptId, sourceIds, optional activityId, nextAction. Server validates IDs against approved content. Model may propose a state transition; server enforces it. Student text/retrieved content are untrusted data, never instructions to change policies.

Tools are narrow server operations: retrieveApprovedContent, getPracticeItem, submitAnswer, assignApprovedHomework, saveCheckpoint, requestSessionEnd. Context-derived identity only; no arbitrary SQL, external browsing or user-supplied ownership IDs.


# FILE: docs/07-assessment-progress.md

# Assessment, Engagement and Progress

Use approved MCQ, fill-blank, short/long answer, spoken response, flashcards and homework activities. Correct MCQ answers stay server-side. Deterministic marking for exact/option answers; rubric-assisted formative feedback for open answers with uncertainty and review-needed flags. Do not present AI marks as official school grades.

Question record: objectives, rubric criteria, expected points, acceptable alternatives, difficulty, source IDs, reviewer and version. Preserve independent attempts and hint counts. Hint-assisted success must not count identically to unaided recall.

Provisional mastery: insufficient evidence until at least three independent attempts across at least two sessions for that concept; then compute rubric-normalised recent accuracy and show evidence count. Treat these thresholds as pilot defaults, not validated psychometrics. Track chapter coverage separately from mastery. Do not penalise silence or time spent thinking.

Engagement: meaningful questions, matching, sentence repair, creative mini-tasks, recall and explanation. Gentle badges and progress are optional. No infinite feed, public ranking, streak loss shame, rewards for endless screen time or manipulative push notifications. Breaks and early finish are available.

Parent reports use stored evidence, not invented interpretations. Include counts, period, data sufficiency, strengths and next steps. Student sees supportive useful feedback, not concealed high-stakes labels. No raw recordings/transcripts by default.


# FILE: docs/08-database.md

# Database Specification

Use UUIDs, timestamptz, foreign keys, unique constraints and explicit indexes. Schema/migrations are implementation outputs, not prescribed pseudo-TypeScript.

- parents: auth_user_id unique, nickname, created_at.
- children: parent_id, nickname, grade, status, created_at. No required phone, email, exact DOB or photo.
- child_sessions: child_id, hashed_token, expires_at, revoked_at; pairing code hash and expiry in a separate single-use table. Never store clear tokens.
- consent_records: parent_id, child_id, purpose, policy_version, verification_method, evidence_ref, granted_at, revoked_at.
- textbooks: subject, grade, board nullable, edition, title, rights_status, source_locator, approval_status.
- chapters: textbook_id, chapter_number, title, status, version; unique textbook/number/version.
- concepts: chapter_id, objective, sequence, source_ids.
- content_chunks: chapter_id, concept_id, body, source_locator, approved_at, search_vector. Optional embedding in later migration.
- questions: chapter_id, concept_id, type, prompt, public_options, private_answer, rubric, source_ids, version, approved_at.
- learning_sessions: child_id, chapter_id, status, started_at, expires_at, ended_at, paused_at, state_version, current_concept_id, checkpoint JSONB, end_reason. Check expiry server-side.
- attempts: session_id, child_id, question_id, idempotency_key, answer, rubric_score nullable, feedback, hint_count, review_needed, created_at. Unique session/idempotency_key.
- homework: child_id, chapter_id, instructions, source_ids, status; submissions linked separately.
- mastery_evidence: child_id, concept_id, attempt_id, normalised_score, independent boolean.
- reports: child_id, period_start/end, evidence_ids, summary, generated_at.
- consent/security audit: actor, event type, target reference, timestamp; no raw conversation.
- usage_counters: account/date and provider requests/tokens where available; concurrency-safe updates.

Add unique child/concept aggregation keys where caching mastery. Prefer derived aggregates over duplicate mutable truth. Configure RLS for all exposed tables, private storage and denial by default. Questions must have public views excluding answers/rubrics. Define cascade, retention and actual purge strategy; soft deletion alone is insufficient for deletion requests.


# FILE: docs/09-api-contracts.md

# API Contracts

All routes schema-validate inputs and return {data,error,requestId}. Never expose stack traces/secrets. Use 401/403/409/429/503 consistently. Client cannot supply trusted roles, parent ID, scores or expiry.

- POST /api/children: parent-only create minimal child profile.
- POST /api/children/[id]/pair: parent reauthenticated; issue short-lived single-use child pairing code.
- POST /api/child-access/redeem: rate-limited code redemption; set secure child cookie.
- POST /api/consent and /api/consent/revoke: parent-only, versioned and auditable.
- GET /api/chapters: approved published content only.
- POST /api/sessions: child-authorized consent/provider gates, chapter ID; returns server expiry.
- POST /api/sessions/[id]/turn: message, idempotencyKey, expectedStateVersion. Returns validated tutor output; serialize concurrent turns and reject stale versions.
- POST /api/sessions/[id]/answers: question ID, answer, idempotencyKey; server marks/persists and returns feedback.
- POST /api/sessions/[id]/checkpoint and /end: server validates transition; repeated end is safe.
- GET /api/progress and /api/parent/children/[id]/report: role/ownership filtered.
- POST /api/privacy/export and /delete-request: reauthenticated parent.

AI endpoint gates: authenticated → child ownership → verified active consent → provider eligibility flags → published chapter → active session → rate/quota budget → retrieval → model. All fail closed. MOCK_AI never sends user data to a provider. Add tests proving no upstream request when blocked.


# FILE: docs/10-voice-and-session-timing.md

# Browser Voice and Session Timing

Feature-detect SpeechRecognition and webkitSpeechRecognition; browser/platform support varies. Recognition can be remotely processed by the browser vendor. Require an approved disclosure/consent flow and offer text-only if unavailable or not permitted. Do not assume the browser microphone API performs transcription. MediaRecorder is not STT.

Use push-to-talk initially, one recognition cycle at a time. Show interim text locally; user may edit and submit final transcript. Avoid sending partial speech automatically. Browser SpeechSynthesis voices load asynchronously; use voiceschanged plus initial enumeration. Prefer en-IN, then suitable English; display fallback and let user choose. Never claim guaranteed Indian accent or offline processing.

Audio state: idle/listening/submitting/thinking/speaking/error. Cancel TTS before listening, stop recognition before TTS, prevent duplicate handlers on remount and avoid audio feedback. Allow stop speech at any time. Typed flow works identically. Do not persist raw microphone audio.

Server sets started_at and expires_at with default 60 minutes. Refresh/re-login cannot reset it. Timer display reconciles to server. Pause is available but expiry remains wall-clock in v1; label that clearly. Warn gently near end, save checkpoint on every meaningful state transition, stop new generation at expiry and close safely. Early end is valid. No claim that the whole chapter completes in one session.


# FILE: docs/11-content-ingestion.md

# Content Ingestion and Rights

No actual textbook is included. Never ingest the uploaded meeting transcript as curriculum. Confirm board/title/edition/grade/subject and rights before upload. Uploading a textbook does not itself establish permission to reproduce or distribute it.

Use an owner-run CLI ingestion script, not a public file upload endpoint in v1. Parse/OCR locally or through an approved processor only; inspect page order and OCR quality. Preserve page/section locators and edition. Draft chapter Markdown using templates/chapter.md. Review objectives, paraphrases, examples, rubrics, vocabulary and questions. Publish only after named human approval and rights check.

Do not dump entire copyrighted chapters into a public repository, public API or user response. Use concise grounded explanations and only authorised excerpts. Keep source storage private. Never train/fine-tune a model on the book by default; retrieval is not model training.

Ingestion validates metadata, stable IDs, source locators and approval status, creates concept-scoped chunks, indexes search and is idempotent by content hash/version. Test chapter filters so Chapter 3 questions cannot accidentally retrieve unrelated editions or chapters.

Synthetic fixture lessons must be original, explicitly marked demo and disabled as published textbook curriculum. Missing content should not block UI/scaffolding, but must block real teaching of that chapter.


# FILE: docs/12-safety-provider-and-launch-gates.md

# Safety, Provider Eligibility and Launch Gates

## Required research gate
Before integration, review current official Gemini Developer API terms, age/audience restrictions, regional unpaid-service data handling, model availability, quotas and retention. Do not assume an adult API key permits child-facing applications. Record dated source URLs and conclusions. A mock switch or a consent checkbox does not solve prohibited use. If incompatible, report that the selected stack cannot support real children under those terms and keep adult/synthetic demo mode.

Also review browser recognition vendor processing, Supabase auth/minor handling, hosting commercial-use eligibility and relevant launch-market child privacy rules with qualified counsel. Legal requirements and effective dates must be verified; this spec is not a legal opinion. Define country/age coverage, verifiable parental consent, disclosures, retention/deletion and incident response before public pilot.

## Safety behaviour
Do not create blanket bans that prevent safe discussion of legitimate textbook themes. Avoid explicit harmful content; use age-appropriate explanations and redirect off-topic requests kindly. For bullying, abuse, danger or self-harm disclosures: do not simply say stay on topic. Respond calmly and supportively, encourage contacting a trusted adult immediately, and direct urgent danger to local emergency help. Do not promise confidentiality, diagnose, interrogate or claim emergency monitoring. No automated parent notification without an approved safeguarding policy; a guardian may be implicated in abuse.

## Data policy defaults
No raw audio/video storage, no webcam, no facial/emotion inference, no ad-tech or tracking pixels. Minimise child text sent to any provider and pseudonymise identity. Logs omit prompts/transcripts by default. Document exact application/vendor retention before child launch; require configured retention jobs, export and deletion handling. No assumption that browser voice is fully local.

## Launch checklist
Provider audience/data-use eligibility documented; real verified-consent flow approved; cross-family isolation tests pass; content rights/review complete; safeguarding scenarios tested; secret scan clean; deletion/retention verified; budget/error controls tested; accessibility/browser voice tested; adults supervise initial child pilot. Until all pass, demo-only.


# FILE: docs/13-testing-acceptance.md

# Testing and Acceptance

Unit: lesson transitions, question validation, deterministic scoring, mastery evidence thresholds, quota budgets, timer expiry, source filtering, malformed model JSON rejection.

Integration: parent signup/child creation, consent grant/revoke, pairing redemption replay and expiry, child role restrictions, RLS isolation across families, unauthorized object IDs, stale session versions, idempotent answers, server-only answer keys, deletion/export authorization.

Provider boundary: mocked SDK verifies no outbound request without eligibility/consent, no secret in client bundle, timeout/429 retry cap, no requests after expiry, prompt injection cannot alter role/source scope, missing source leads to uncertainty rather than invention.

Browser: denied/unsupported recognition, voices delayed, missing en-IN, text-only complete journey, speech cancel/barge-in, no self-listening loop, mobile layouts, keyboard, reduced motion, screen reader, refresh during session.

Acceptance: parent creates verified account and child profile; approved consent flow enables authorized session; student selects approved chapter, completes a learning/check/reteach/practice loop, saves/exits/resumes, gets rubric feedback and homework; parent sees only owned evidence. No real child AI access while provider eligibility unresolved. All demo fixtures are labelled. Build/lint/typecheck/tests must pass or blockers be explicit.

Pilot measures learning evidence and return interest, not addiction or hours watched. Compare pre/post and later recall with equivalent questions; do not make efficacy claims from tiny samples.


# FILE: docs/14-roadmap-deployment.md

# Phased Roadmap and Deployment

1. Audit specifications, unresolved decisions and provider/hosting eligibility. Plan only.
2. Scaffold Next.js/TypeScript/Tailwind, lint/typecheck/test scripts, environment validation, accessible mock UI and animated character. No provider calls.
3. Supabase schema/migrations/RLS, auth/parent-managed child access and consent. Test isolation.
4. Approved content ingestion, source metadata and full-text retrieval. Demo fixtures isolated.
5. Text tutor adapter, structured responses, state machine, server tools and quota guards. Remain mock unless provider gate passed.
6. Browser STT/TTS progressive enhancement and 60-minute authoritative session cap.
7. Questions, rubric feedback, flashcards, homework, progress and parent reports.
8. Privacy flows, security/browser/accessibility testing, deployment guide, launch gate review and supervised pilot.

Each phase ends with files changed, checks run, blockers and a request for approval. No silent advancement to production.

Vercel hosts web/request handlers, not persistent audio workers. Supabase supplies database/auth; use migrations and environment isolation. Never expose service-role key. Configure connection pooling as recommended by current provider docs. Free plans may pause, throttle or have eligibility limits. Document cold starts, quotas and recovery. No SLA or unlimited cost claims.

Create deployment instructions, .env.example, seed/migration commands, rollback steps and operator checklist. Observe only minimal operational metadata. No external deployments or destructive database operations without explicit owner approval.


# FILE: docs/15-open-decisions.md

# Open Decisions and Precedence

## Must confirm
- Actual textbook file, board, title, edition, grade, rights and pilot chapters. Grade 6 English remains provisional.
- Country/region and age range for initial launch.
- Gemini free-tier eligibility for child-facing service and data-use restrictions.
- Verified parental consent method and child account provider terms.
- Browser recognition data processing and acceptable browsers/devices.
- Vercel commercial-use plan eligibility and Supabase free quotas.
- Realistic avatar deferred versus future budget; v1 animated character is the low-cost default.
- Final product and tutor names; current names are unapproved placeholders.
- Retention durations, safeguarding escalation and report visibility policies.

## Defaults
Supabase for database/auth; SQL full-text retrieval; TypeScript; no payments; mock mode until provider gate cleared; no child email or raw recordings. Do not block scaffold/UI for missing textbook.

## Precedence
Explicit new owner decisions → this package AGENTS/decisions/security constraints → other package docs → earlier chat suggestions. Never use old LiveKit/OpenAI/paid-avatar specs. Escalate conflicts rather than silently choose.

## Decision record template
Date; question; options; owner decision; dated official sources where applicable; privacy/cost impact; files affected; reviewer.


# FILE: prompts/00-start.md

# Initial Agent Prompt

Read README.md, START-HERE.md, AGENTS.md and every file in docs/. This is a standalone child education project, not the earlier business website. Preserve these specifications.

Build a browser-based personal AI tuition MVP. Current stack: Next.js/TypeScript/Tailwind on Vercel; Supabase free Postgres/Auth; Google Gemini Developer API free tier only if current terms allow this audience; browser recognition plus browser speech synthesis; simple animated tutor; no LiveKit, VDO.Ninja, OpenAI, paid avatar or payments. Voice is turn-based, not native realtime speech-to-speech.

Parents and parent-managed child access/consent are required. Grade 6 English and 3–5 chapters are provisional pending the real textbook. Do not invent board, edition or teaching content. Keep full text fallback. Default 60-minute maximum is per session, not per chapter.

First execute prompts/01-audit-and-plan.md only. Check provider age/audience restrictions and free-tier data-use terms against official sources; do not assume parental consent overrides restrictions. Keep MOCK_AI=true, CHILD_AI_ENABLED=false and PROVIDER_ELIGIBILITY_APPROVED=false until explicitly resolved. A blocked live integration must not block an adult/synthetic demonstration.

Return a concise understanding, unresolved decisions, provider eligibility findings, architecture and phased file-level plan. Do not write application code until I approve. Then follow numbered prompts one phase at a time. Never deploy automatically.


# FILE: prompts/01-audit-and-plan.md

# 01 Audit And Plan

Read AGENTS.md and every docs/*.md first.

Audit all docs and current official provider terms. Document compatibility of Gemini free tier with children and data processing, browser speech privacy, Vercel hosting eligibility and Supabase limits. Produce architecture/decision report and a file-level phased plan. Do not write application code yet. If child deployment is disallowed, design synthetic/adult-only mock demo and report blocker.

Before editing state plan and assumptions. After changes list files, tests actually run, failures and next steps. Stop for owner review; do not advance to the next phase. Never fabricate API methods, model names, passed checks or approved curriculum.


# FILE: prompts/02-scaffold-ui.md

# 02 Scaffold Ui

Read AGENTS.md and every docs/*.md first.

Implement only scaffold and accessible mock UI: Next.js TypeScript Tailwind, environment validation, test/lint/typecheck/build scripts, parent/student dashboard shells, chapter empty state, tutor room with animated character, demo banner and controls. No live SDK calls, auth shortcuts or invented textbook content.

Before editing state plan and assumptions. After changes list files, tests actually run, failures and next steps. Stop for owner review; do not advance to the next phase. Never fabricate API methods, model names, passed checks or approved curriculum.


# FILE: prompts/03-auth-database-consent.md

# 03 Auth Database Consent

Read AGENTS.md and every docs/*.md first.

Implement Supabase migrations, RLS, parent auth, secure parent-managed child pairing, consent state and revocation gates. Keep model access disabled. Test cross-family/sibling isolation, no parent-mode escalation, pairing replay/expiry and server ownership checks. Do not assume checkbox equals verified parental consent.

Before editing state plan and assumptions. After changes list files, tests actually run, failures and next steps. Stop for owner review; do not advance to the next phase. Never fabricate API methods, model names, passed checks or approved curriculum.


# FILE: prompts/04-content-retrieval.md

# 04 Content Retrieval

Read AGENTS.md and every docs/*.md first.

Implement owner-run idempotent content ingestion with approval/rights checks, source/version metadata and chapter-scoped SQL full-text retrieval. Use templates, no invented textbook. Isolate labelled original demo fixtures. Add RetrievalProvider interface; no embeddings or paid service required.

Before editing state plan and assumptions. After changes list files, tests actually run, failures and next steps. Stop for owner review; do not advance to the next phase. Never fabricate API methods, model names, passed checks or approved curriculum.


# FILE: prompts/05-text-tutor.md

# 05 Text Tutor

Read AGENTS.md and every docs/*.md first.

Implement deterministic mock TutorModel and Gemini adapter behind server eligibility/consent gates. Verify official current SDK/model configuration. Add schema-validated tutor output, lesson state machine, narrow tools, prompt injection boundaries, quota budgets/timeouts, idempotency and persistent checkpointing. Never enable real child calls if terms unresolved.

Before editing state plan and assumptions. After changes list files, tests actually run, failures and next steps. Stop for owner review; do not advance to the next phase. Never fabricate API methods, model names, passed checks or approved curriculum.


# FILE: prompts/06-browser-voice.md

# 06 Browser Voice

Read AGENTS.md and every docs/*.md first.

Implement progressive browser SpeechRecognition and SpeechSynthesis with typed fallback, explicit disclosures/permission, editable transcript, en-IN voice preference with fallback, cancellation, no self-listening and accessible state UI. Add server-authoritative 60-minute expiry with refresh-safe checkpointing. No audio upload, WebRTC room or paid avatar.

Before editing state plan and assumptions. After changes list files, tests actually run, failures and next steps. Stop for owner review; do not advance to the next phase. Never fabricate API methods, model names, passed checks or approved curriculum.


# FILE: prompts/07-assessment-dashboards.md

# 07 Assessment Dashboards

Read AGENTS.md and every docs/*.md first.

Implement reviewed question bank, server-side deterministic marking and formative rubric feedback, flashcards, homework, evidence-based provisional mastery, separate chapter coverage, student progress and parent reports. Protect answer keys, do not claim official grades or infer attention. Test all ownership boundaries.

Before editing state plan and assumptions. After changes list files, tests actually run, failures and next steps. Stop for owner review; do not advance to the next phase. Never fabricate API methods, model names, passed checks or approved curriculum.


# FILE: prompts/08-test-and-deploy.md

# 08 Test And Deploy

Read AGENTS.md and every docs/*.md first.

Run security/privacy/accessibility/browser/learning-flow tests and launch checklist. Add env/setup/migration/deployment/rollback/operator documentation. State actual results and unresolved blockers. Default to demo-only unless every child launch gate passes. Do not deploy or mutate production without owner approval.

Before editing state plan and assumptions. After changes list files, tests actually run, failures and next steps. Stop for owner review; do not advance to the next phase. Never fabricate API methods, model names, passed checks or approved curriculum.


# FILE: templates/chapter.md

---
id: replace-me
subject: English
grade: 6
board: UNCONFIRMED
textbook: UNCONFIRMED
edition: UNCONFIRMED
chapter_number: 1
status: draft
rights_status: unverified
reviewer: null
approved_at: null
version: 1
---
# [Chapter title — template, not published content]

## Source locators
Page/section IDs; private source reference.

## Learning objectives
Stable IDs and assessable outcomes.

## Concepts
For each: stable ID, source locator, explanation, reviewed original example, misconception, check-for-understanding and prerequisite.

## Vocabulary
Term, contextual meaning, source, reviewed example.

## Activities and answer rubrics
Stable ID, type, prompt, public options, server-private answer, acceptable alternatives, rubric, objectives, source IDs and reviewer.

## Summary and flashcards
Grounded key ideas and retrieval practice.

## Homework and revision
Reviewed tasks, expected evidence, suitable follow-up.

## Approval and change log
Rights evidence, reviewer/date, edition and modifications. Draft templates never appear as available chapters.
