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
