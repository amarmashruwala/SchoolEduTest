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
