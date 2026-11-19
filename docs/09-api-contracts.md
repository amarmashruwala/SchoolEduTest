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
