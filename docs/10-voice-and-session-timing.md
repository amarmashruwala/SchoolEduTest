# Browser Voice and Session Timing

Feature-detect SpeechRecognition and webkitSpeechRecognition; browser/platform support varies. Recognition can be remotely processed by the browser vendor. Require an approved disclosure/consent flow and offer text-only if unavailable or not permitted. Do not assume the browser microphone API performs transcription. MediaRecorder is not STT.

Use push-to-talk initially, one recognition cycle at a time. Show interim text locally; user may edit and submit final transcript. Avoid sending partial speech automatically. Browser SpeechSynthesis voices load asynchronously; use voiceschanged plus initial enumeration. Prefer en-IN, then suitable English; display fallback and let user choose. Never claim guaranteed Indian accent or offline processing.

Audio state: idle/listening/submitting/thinking/speaking/error. Cancel TTS before listening, stop recognition before TTS, prevent duplicate handlers on remount and avoid audio feedback. Allow stop speech at any time. Typed flow works identically. Do not persist raw microphone audio.

Server sets started_at and expires_at with default 60 minutes. Refresh/re-login cannot reset it. Timer display reconciles to server. Pause is available but expiry remains wall-clock in v1; label that clearly. Warn gently near end, save checkpoint on every meaningful state transition, stop new generation at expiry and close safely. Early end is valid. No claim that the whole chapter completes in one session.
