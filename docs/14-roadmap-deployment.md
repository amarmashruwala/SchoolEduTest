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
