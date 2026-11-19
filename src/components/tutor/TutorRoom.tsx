"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TutorCharacter,
  type TutorCharacterState,
} from "@/components/tutor/TutorCharacter";
import { StateNotice } from "@/components/StateNotice";
import type { SystemUiState } from "@/lib/ui-states";

interface TutorRoomProps {
  sessionId: string;
}

const DEMO_TURNS: Record<string, { speechText: string; whiteboard: string }> = {
  welcome: {
    speechText:
      "Hello! I am Aanya, your AI study companion (synthetic demo). Today's sample goal is practicing active reading with short, clear questions. Ready to try a quick warm-up?",
    whiteboard:
      "Synthetic Demo Lesson (Not Official Curriculum)\nTopic: Active Reading Warm-Up\nQuestion 1: In a story, what helps us understand why a character makes a choice?",
  },
  simplify: {
    speechText:
      "Let's make that simpler: look for clues about what the character wants or feels before they act.",
    whiteboard:
      "Simplified Hint (Synthetic Demo)\nClue 1: What does the character want?\nClue 2: How do they feel?",
  },
  repeat: {
    speechText:
      "Sure, here is the question again: In a story, what helps us understand why a character makes a choice?",
    whiteboard:
      "Repeated Question (Synthetic Demo)\nIn a story, what helps us understand why a character makes a choice?",
  },
  example: {
    speechText:
      "Here is a tutor example (not from a textbook): If Maya brings an umbrella even when the sky looks clear, her earlier look at dark clouds explains her choice.",
    whiteboard:
      "Tutor Example (Synthetic Demo)\nAction: Maya packs an umbrella.\nClue: She saw dark clouds earlier.",
  },
  quiz: {
    speechText:
      "Quick check! Which clue best explains why someone in a story runs to the bus stop?",
    whiteboard:
      "Quick Check (Synthetic Demo)\nA) They are late for school.\nB) They like collecting stamps.\nType A or B below.",
  },
};

export function TutorRoom({ sessionId }: TutorRoomProps) {
  const [characterState, setCharacterState] =
    useState<TutorCharacterState>("idle");
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [voiceDisclosed, setVoiceDisclosed] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [typedInput, setTypedInput] = useState("");
  const [tutorText, setTutorText] = useState(DEMO_TURNS.welcome.speechText);
  const [whiteboardText, setWhiteboardText] = useState(
    DEMO_TURNS.welcome.whiteboard
  );
  const [previewState, setPreviewState] = useState<SystemUiState | "normal">(
    "normal"
  );

  const handleControlAction = (key: keyof typeof DEMO_TURNS) => {
    if (ended || paused) return;
    setCharacterState("thinking");
    const next = DEMO_TURNS[key];
    setTutorText(next.speechText);
    setWhiteboardText(next.whiteboard);
    setCharacterState("speaking");
  };

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim() || ended || paused) return;
    setCharacterState("thinking");
    setTutorText(
      `Thanks for your answer ("${typedInput.trim()}"). In this Phase 2 UI scaffold, live AI scoring is disabled. Notice how we look for text clues that connect a character's feelings to their action.`
    );
    setTypedInput("");
    setCharacterState("idle");
  };

  const handlePushToTalk = () => {
    if (ended || paused) return;
    if (!voiceDisclosed) {
      setShowVoiceModal(true);
      return;
    }
    setCharacterState((prev) =>
      prev === "listening" ? "idle" : "listening"
    );
  };

  const handleStopSpeaking = () => {
    setCharacterState("idle");
  };

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
            Session {sessionId} · Synthetic Demo
          </p>
          <h1 className="text-lg font-bold text-slate-900">
            Active Reading Warm-Up
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-950"
            aria-label="Session time remaining"
          >
            58:00 / 60:00 (Wall-clock cap)
          </div>
          <Link
            href="/student"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Save &amp; Exit
          </Link>
        </div>
      </div>

      {/* Optional System State Banner */}
      {previewState !== "normal" && (
        <StateNotice state={previewState} actionHref="/student" />
      )}

      {paused && !ended && (
        <div
          role="status"
          className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium text-amber-950"
        >
          Session paused. Note: The 60-minute wall-clock session cap continues
          to run while paused.
        </div>
      )}

      {ended && <StateNotice state="expired_session" actionHref="/student" />}

      {/* Main Split Workspace (stacks cleanly on mobile without hiding question or controls) */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Tutor + Captions */}
        <section
          aria-label="Tutor conversation"
          className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-7"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <TutorCharacter state={characterState} />
            <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Tutor Captions (AI)
              </p>
              <p className="mt-1.5 text-base leading-relaxed text-slate-900 md:text-lg">
                {tutorText}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 space-y-4 border-t border-slate-200 pt-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handlePushToTalk}
                disabled={ended || paused}
                className="min-h-[44px] rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
              >
                {characterState === "listening"
                  ? "Stop Listening"
                  : "Push to Talk"}
              </button>

              <button
                type="button"
                onClick={handleStopSpeaking}
                className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Stop Speaking
              </button>

              <button
                type="button"
                onClick={() => handleControlAction("simplify")}
                disabled={ended || paused}
                className="min-h-[44px] rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-900 hover:bg-indigo-100 disabled:opacity-50"
              >
                Simplify
              </button>

              <button
                type="button"
                onClick={() => handleControlAction("repeat")}
                disabled={ended || paused}
                className="min-h-[44px] rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-900 hover:bg-indigo-100 disabled:opacity-50"
              >
                Repeat
              </button>

              <button
                type="button"
                onClick={() => handleControlAction("example")}
                disabled={ended || paused}
                className="min-h-[44px] rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-900 hover:bg-indigo-100 disabled:opacity-50"
              >
                Example
              </button>

              <button
                type="button"
                onClick={() => handleControlAction("quiz")}
                disabled={ended || paused}
                className="min-h-[44px] rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-900 hover:bg-indigo-100 disabled:opacity-50"
              >
                Quiz
              </button>

              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                disabled={ended}
                className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-50"
              >
                {paused ? "Resume" : "Pause"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setEnded(true);
                  setCharacterState("idle");
                }}
                disabled={ended}
                className="min-h-[44px] rounded-lg border border-rose-300 bg-rose-50 px-3.5 py-2 text-sm font-semibold text-rose-900 hover:bg-rose-100 disabled:opacity-50"
              >
                End Session
              </button>
            </div>

            {/* Typed Answer Fallback (always available) */}
            <form onSubmit={handleTypedSubmit} className="flex gap-2">
              <label htmlFor="student-typed-input" className="sr-only">
                Type your answer or question
              </label>
              <input
                id="student-typed-input"
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                disabled={ended || paused}
                placeholder="Type your answer or question..."
                className="min-h-[44px] flex-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-base text-slate-900 placeholder:text-slate-500 disabled:bg-slate-100"
              />
              <button
                type="submit"
                disabled={ended || paused || !typedInput.trim()}
                className="min-h-[44px] rounded-lg bg-indigo-700 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </section>

        {/* Activity / Whiteboard Panel */}
        <aside
          aria-label="Lesson whiteboard and activity"
          className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-5"
        >
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Activity &amp; Whiteboard
            </h2>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 font-sans text-base leading-relaxed text-slate-900">
              {whiteboardText}
            </pre>
          </div>

          {/* Demo State Inspector for Phase 2 Review */}
          <div className="mt-6 border-t border-slate-200 pt-4">
            <label
              htmlFor="demo-state-select"
              className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
            >
              Demo UI State Preview
            </label>
            <select
              id="demo-state-select"
              value={previewState}
              onChange={(e) =>
                setPreviewState(e.target.value as SystemUiState | "normal")
              }
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            >
              <option value="normal">Normal Active State</option>
              <option value="unsupported_speech">Unsupported Speech</option>
              <option value="denied_microphone">Denied Microphone</option>
              <option value="quota_exceeded">Quota Exceeded</option>
              <option value="expired_session">Expired Session</option>
              <option value="offline">Offline</option>
              <option value="reconnecting">Reconnecting</option>
              <option value="provider_blocked">Provider Blocked</option>
            </select>
          </div>
        </aside>
      </div>

      {/* First-Use Voice Disclosure Modal */}
      {showVoiceModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="voice-disclosure-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
        >
          <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
            <h2
              id="voice-disclosure-title"
              className="text-lg font-bold text-slate-900"
            >
              Browser Voice Disclosure
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Browser speech recognition may send your voice audio to your
              browser vendor&apos;s remote speech service for transcription. No
              raw audio is stored by this app, and you can use typed input at
              any time.
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowVoiceModal(false)}
                className="min-h-[44px] rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Use Text Only
              </button>
              <button
                type="button"
                onClick={() => {
                  setVoiceDisclosed(true);
                  setShowVoiceModal(false);
                  setCharacterState("listening");
                }}
                className="min-h-[44px] rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
              >
                I Understand, Enable Push-to-Talk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
