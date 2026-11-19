# Authentication, Consent and Security

Parent uses verified adult account. Child uses parent-managed nickname/profile, not a required email. For separate child-device sessions, implement one-time, short-lived parent-issued pairing codes backed by a least-privilege session; never a public nickname-only login or a permanent shared PIN. Parent reauthentication required to enter parent settings from child mode. Document the chosen implementation before building.

Every request derives identity from verified session claims; never trust body parentId/childId. Verify family ownership, role and active consent server-side. Parent DB queries cannot access other families; child queries cannot access siblings or parent settings. Use RLS with explicit policies; service-role use must not bypass ownership checks.

Consent stores purpose, policy version, timestamp, verification method/evidence reference and revocation. A checkbox is not automatically verifiable parental consent. Demonstration consent must be labelled; production child access stays blocked until the approved verification flow is configured.

Revoke consent → block new AI/voice requests immediately and end active sessions safely. Provide export and deletion request flow, with documented provider retention limitations. Do not claim instant deletion from backups/vendor logs.

Use CSRF/origin checks as applicable, secure HttpOnly cookies, least privilege, input/output schemas, login/session/LLM rate limits, redacted logs and audit events without unnecessary child text. Never include service-role keys in client bundles.
