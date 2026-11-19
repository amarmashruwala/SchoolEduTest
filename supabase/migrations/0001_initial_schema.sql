-- Phase 3: Core schema, RLS, and indexes
-- All tables use UUID PKs, timestamptz, and explicit FKs.
-- RLS is enabled on every exposed table; policies enforce family isolation.

-- 1. parents
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID NOT NULL UNIQUE,
  nickname TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. children
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  grade TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. child_sessions (secure, single-use, short-lived tokens)
CREATE TABLE child_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  hashed_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. child_pairing_codes (single-use, parent-issued, short-lived)
CREATE TABLE child_pairing_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. consent_records (versioned, auditable, revocable)
CREATE TABLE consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  verification_method TEXT NOT NULL,
  evidence_ref TEXT,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  revoked_at TIMESTAMPTZ
);

-- 6. textbooks (metadata only; content in content_chunks)
CREATE TABLE textbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  board TEXT,
  edition TEXT NOT NULL,
  title TEXT NOT NULL,
  rights_status TEXT NOT NULL,
  source_locator TEXT,
  approval_status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. chapters (approved/published only served to students)
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  textbook_id UUID NOT NULL REFERENCES textbooks(id) ON DELETE CASCADE,
  chapter_number INT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (textbook_id, chapter_number, version)
);

-- 8. concepts (learning objectives)
CREATE TABLE concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  objective TEXT NOT NULL,
  sequence INT NOT NULL,
  source_ids TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. content_chunks (chapter-scoped, approved, searchable)
CREATE TABLE content_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  concept_id UUID REFERENCES concepts(id) ON DELETE SET NULL,
  body TEXT NOT NULL,
  source_locator TEXT NOT NULL,
  approved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  search_vector TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', body)) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. questions (server-private answer/rubric)
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  concept_id UUID REFERENCES concepts(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('mcq','fill_blank','short_answer','long_answer','spoken','flashcard')),
  prompt TEXT NOT NULL,
  public_options JSONB,
  private_answer TEXT NOT NULL,
  rubric JSONB NOT NULL,
  source_ids TEXT[] NOT NULL DEFAULT '{}',
  version INT NOT NULL DEFAULT 1,
  approved_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Public view: questions without private_answer/rubric
CREATE VIEW public_questions AS
SELECT id, chapter_id, concept_id, type, prompt, public_options, source_ids, version, approved_at
FROM questions
WHERE approved_at IS NOT NULL;

-- 11. learning_sessions (server-authoritative expiry)
CREATE TABLE learning_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','ended')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  paused_at TIMESTAMPTZ,
  state_version INT NOT NULL DEFAULT 1,
  current_concept_id UUID REFERENCES concepts(id) ON DELETE SET NULL,
  checkpoint JSONB NOT NULL DEFAULT '{}',
  end_reason TEXT
);

-- 12. attempts (idempotent, with hint tracking)
CREATE TABLE attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES learning_sessions(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  idempotency_key TEXT NOT NULL,
  answer TEXT NOT NULL,
  rubric_score NUMERIC,
  feedback TEXT,
  hint_count INT NOT NULL DEFAULT 0,
  review_needed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id, idempotency_key)
);

-- 13. homework
CREATE TABLE homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  instructions TEXT NOT NULL,
  source_ids TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned','submitted','reviewed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. mastery_evidence (provisional mastery tracking)
CREATE TABLE mastery_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  concept_id UUID NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  attempt_id UUID NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  normalised_score NUMERIC NOT NULL,
  independent BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 15. reports (parent-facing)
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  evidence_ids UUID[] NOT NULL DEFAULT '{}',
  summary TEXT NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 16. audit_events (security/consent, no raw conversation)
CREATE TABLE audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor UUID NOT NULL,
  event_type TEXT NOT NULL,
  target_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 17. usage_counters (provider quotas)
CREATE TABLE usage_counters (
  account_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  provider_requests INT NOT NULL DEFAULT 0,
  provider_tokens BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (account_id, date)
);

-- Indexes for common lookups
CREATE INDEX idx_children_parent ON children(parent_id);
CREATE INDEX idx_child_sessions_child ON child_sessions(child_id);
CREATE INDEX idx_child_sessions_token ON child_sessions(hashed_token);
CREATE INDEX idx_pairing_codes_parent ON child_pairing_codes(parent_id);
CREATE INDEX idx_pairing_codes_child ON child_pairing_codes(child_id);
CREATE INDEX idx_pairing_codes_hash ON child_pairing_codes(code_hash);
CREATE INDEX idx_consent_parent_child ON consent_records(parent_id, child_id);
CREATE INDEX idx_chapters_textbook ON chapters(textbook_id);
CREATE INDEX idx_concepts_chapter ON concepts(chapter_id);
CREATE INDEX idx_content_chunks_chapter ON content_chunks(chapter_id);
CREATE INDEX idx_content_chunks_search ON content_chunks USING GIN(search_vector);
CREATE INDEX idx_questions_chapter ON questions(chapter_id);
CREATE INDEX idx_learning_sessions_child ON learning_sessions(child_id);
CREATE INDEX idx_attempts_session ON attempts(session_id);
CREATE INDEX idx_attempts_child ON attempts(child_id);
CREATE INDEX idx_mastery_child_concept ON mastery_evidence(child_id, concept_id);
CREATE INDEX idx_reports_child ON reports(child_id);

-- Enable RLS on all exposed tables
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_pairing_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE textbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE mastery_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_counters ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- parents: can only see own row (by auth_user_id)
CREATE POLICY parents_own ON parents
  FOR ALL USING (auth_user_id = auth.uid());

-- children: parent can CRUD own children; child sessions cannot query siblings
CREATE POLICY children_parent_manage ON children
  FOR ALL USING (
    parent_id IN (SELECT id FROM parents WHERE auth_user_id = auth.uid())
  );

-- child_sessions: child can read/update own session; parent can read for audit
CREATE POLICY child_sessions_child_own ON child_sessions
  FOR SELECT USING (
    child_id IN (
      SELECT c.id FROM children c
      JOIN parents p ON p.id = c.parent_id
      WHERE p.auth_user_id = auth.uid()
    )
  );
CREATE POLICY child_sessions_child_update ON child_sessions
  FOR UPDATE USING (
    child_id IN (
      SELECT c.id FROM children c
      JOIN parents p ON p.id = c.parent_id
      WHERE p.auth_user_id = auth.uid()
    )
  );

-- child_pairing_codes: parent manages own children's codes; child cannot read
CREATE POLICY pairing_parent_manage ON child_pairing_codes
  FOR ALL USING (
    parent_id IN (SELECT id FROM parents WHERE auth_user_id = auth.uid())
  );

-- consent_records: parent manages own family's consent; child cannot read
CREATE POLICY consent_parent_manage ON consent_records
  FOR ALL USING (
    parent_id IN (SELECT id FROM parents WHERE auth_user_id = auth.uid())
  );

-- textbooks/chapters/concepts/content_chunks: public read for approved/published only
CREATE POLICY textbooks_public_approved ON textbooks
  FOR SELECT USING (approval_status = 'approved');
CREATE POLICY chapters_public_approved ON chapters
  FOR SELECT USING (status = 'approved');
CREATE POLICY concepts_public_approved ON concepts
  FOR SELECT USING (
    chapter_id IN (SELECT id FROM chapters WHERE status = 'approved')
  );
CREATE POLICY content_chunks_public_approved ON content_chunks
  FOR SELECT USING (
    chapter_id IN (SELECT id FROM chapters WHERE status = 'approved')
  );

-- questions: no direct select (use public_questions view)
-- The view inherits RLS from questions, so we restrict questions to service-role/admin
CREATE POLICY questions_admin_only ON questions
  FOR ALL USING (false);

-- learning_sessions: child owns session; parent can read
CREATE POLICY sessions_child_own ON learning_sessions
  FOR ALL USING (
    child_id IN (
      SELECT c.id FROM children c
      JOIN parents p ON p.id = c.parent_id
      WHERE p.auth_user_id = auth.uid()
    )
  );

-- attempts: child owns attempts; parent can read
CREATE POLICY attempts_child_own ON attempts
  FOR ALL USING (
    child_id IN (
      SELECT c.id FROM children c
      JOIN parents p ON p.id = c.parent_id
      WHERE p.auth_user_id = auth.uid()
    )
  );

-- homework: child owns; parent can read
CREATE POLICY homework_child_own ON homework
  FOR ALL USING (
    child_id IN (
      SELECT c.id FROM children c
      JOIN parents p ON p.id = c.parent_id
      WHERE p.auth_user_id = auth.uid()
    )
  );

-- mastery_evidence: child owns; parent can read
CREATE POLICY mastery_child_own ON mastery_evidence
  FOR ALL USING (
    child_id IN (
      SELECT c.id FROM children c
      JOIN parents p ON p.id = c.parent_id
      WHERE p.auth_user_id = auth.uid()
    )
  );

-- reports: parent reads own family's reports
CREATE POLICY reports_parent_read ON reports
  FOR SELECT USING (
    child_id IN (
      SELECT c.id FROM children c
      JOIN parents p ON p.id = c.parent_id
      WHERE p.auth_user_id = auth.uid()
    )
  );

-- audit_events: parent reads own family's events
CREATE POLICY audit_parent_read ON audit_events
  FOR SELECT USING (
    actor IN (
      SELECT id FROM parents WHERE auth_user_id = auth.uid()
    ) OR
    actor IN (
      SELECT c.id FROM children c
      JOIN parents p ON p.id = c.parent_id
      WHERE p.auth_user_id = auth.uid()
    )
  );

-- usage_counters: parent/admin only
CREATE POLICY usage_parent ON usage_counters
  FOR ALL USING (
    account_id IN (
      SELECT id FROM parents WHERE auth_user_id = auth.uid()
    )
  );