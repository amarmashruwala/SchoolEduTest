# Testing and Acceptance

Unit: lesson transitions, question validation, deterministic scoring, mastery evidence thresholds, quota budgets, timer expiry, source filtering, malformed model JSON rejection.

Integration: parent signup/child creation, consent grant/revoke, pairing redemption replay and expiry, child role restrictions, RLS isolation across families, unauthorized object IDs, stale session versions, idempotent answers, server-only answer keys, deletion/export authorization.

Provider boundary: mocked SDK verifies no outbound request without eligibility/consent, no secret in client bundle, timeout/429 retry cap, no requests after expiry, prompt injection cannot alter role/source scope, missing source leads to uncertainty rather than invention.

Browser: denied/unsupported recognition, voices delayed, missing en-IN, text-only complete journey, speech cancel/barge-in, no self-listening loop, mobile layouts, keyboard, reduced motion, screen reader, refresh during session.

Acceptance: parent creates verified account and child profile; approved consent flow enables authorized session; student selects approved chapter, completes a learning/check/reteach/practice loop, saves/exits/resumes, gets rubric feedback and homework; parent sees only owned evidence. No real child AI access while provider eligibility unresolved. All demo fixtures are labelled. Build/lint/typecheck/tests must pass or blockers be explicit.

Pilot measures learning evidence and return interest, not addiction or hours watched. Compare pre/post and later recall with equivalent questions; do not make efficacy claims from tiny samples.
