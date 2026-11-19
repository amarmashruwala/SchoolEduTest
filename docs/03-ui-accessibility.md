# UI and Accessibility

Use a playful but calm learning workspace, not an infinite feed or a generic admin dashboard. Working design defaults: indigo, teal, warm neutral background; ensure accessible foreground contrast instead of assuming palette compliance. Working names are configurable.

Readable 16–18px body, clear hierarchy, 44px minimum touch targets, visible focus, keyboard operation, semantic controls, labelled errors, reduced motion, captions/text for all tutor speech. No autoplay microphone or speech on page load. Avoid screen-reader announcements of every token.

Required routes: /, /login, /signup, /parent, /parent/children/new, /parent/children/[id], /parent/consent, /student, /student/chapters, /student/session/[id], /student/homework, /student/progress, /settings/privacy.

Provide empty curriculum, unsupported speech, denied microphone, quota exceeded, expired session, offline, reconnecting and provider-blocked states. Mock mode has a persistent demo banner. Never simulate live AI without disclosure.

At first voice use disclose that browser speech recognition may use the browser vendor’s remote service. Request permission only after action and approval. Offer text throughout. No webcam, facial analysis or recording UI.
