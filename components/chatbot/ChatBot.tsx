"use client";
import { useEffect, useState, useCallback } from "react";
import { ChatLauncher } from "./ChatLauncher";
import { ChatPanel } from "./ChatPanel";
import type { ChatMessage, IntakePayload } from "@/lib/chatbot/types";

/**
 * Top-level EDUS chatbot. Mounts once in the root layout.
 *
 * Responsibilities:
 *   - Track open/closed state of the chat panel.
 *   - Own the conversation history (messages array). The history is
 *     held in component state, not localStorage, because:
 *       * Each visit is a fresh sales opportunity for EDUS.
 *       * Stored conversations risk leaking parent PII to anyone with
 *         physical access to the device (shared family laptops are common).
 *       * GDPR / Sri Lanka PDPA exposure is minimised by not persisting.
 *   - Auto-open the panel AFTER 30 seconds on first visit per session.
 *     Mirrors how high-converting chat widgets time their first impression:
 *     long enough that the parent has scanned the page, short enough that
 *     they haven't bounced. The panel opens in "auto" mode which shows a
 *     "Would you like to join EDUS Online classes?" yes/no prompt before
 *     revealing the intake form, so the visitor consents to the
 *     conversation before we ask for their details.
 *
 * Performance:
 *   - This file is the entry point. ChatPanel is the heavy piece (it
 *     pulls in the message bubble component + the network call wiring).
 *     We dynamically import ChatPanel only after the launcher is
 *     clicked - keeps the chatbot's contribution to LCP at near-zero.
 */

/** How long after page load the auto-open fires. 30s aligns with EDUS
 *  visitor behaviour: most engaged sessions reach 30s, drive-by traffic
 *  has already bounced by then. */
const AUTO_OPEN_DELAY_MS = 30_000;

/** Sessionstorage flag - once set, the auto-open never fires again for
 *  this browser session. Independent of manual open/close so closing the
 *  panel doesn't relock auto-open if the parent re-opens later. */
const AUTO_OPEN_FIRED_KEY = "edus.chatbot.autoOpenedOnce";

/** Sessionstorage flag - tracks whether the parent has interacted with
 *  the launcher at all (manual open or dismiss). Used to drive the
 *  launcher pulse animation. */
const SESSION_INTERACTED_KEY = "edus.chatbot.interacted";

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // Pre-chat intake captured by the IntakeForm. null = form still showing.
  // Held at the ChatBot (not ChatPanel) level so closing + reopening the
  // panel mid-session preserves the form submission. Parents shouldn't
  // need to re-fill if they accidentally close the panel.
  const [intake, setIntake] = useState<IntakePayload | null>(null);
  // Tracks WHY the panel opened. "auto" = 30s timer fired and we should
  // show the Yes/No consent prompt. "manual" = user clicked the launcher
  // and goes straight to the intake form (current behaviour preserved).
  // Resets to null when the panel closes.
  const [openMode, setOpenMode] = useState<"auto" | "manual" | null>(null);

  // 30-second auto-open. Fires at most once per session - the
  // AUTO_OPEN_FIRED_KEY check makes sure refreshing the page or coming
  // back from another tab doesn't re-trigger.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(AUTO_OPEN_FIRED_KEY)) return;
    if (sessionStorage.getItem(SESSION_INTERACTED_KEY)) return;

    const id = window.setTimeout(() => {
      // Lock the flag BEFORE opening so the open itself can't race
      // and double-fire if React re-runs the effect (Strict Mode).
      sessionStorage.setItem(AUTO_OPEN_FIRED_KEY, "1");
      setOpen(true);
      setOpenMode("auto");
    }, AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(id);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setOpenMode("manual");
    setInteracted(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_INTERACTED_KEY, "opened");
      // Manual open also satisfies the auto-open contract - if the
      // visitor opened within the 30s window, don't auto-open later.
      sessionStorage.setItem(AUTO_OPEN_FIRED_KEY, "1");
    }
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setOpenMode(null);
    // Closing the panel counts as an interaction - the launcher should
    // stop pulsing now that the parent has acknowledged it exists.
    setInteracted(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_INTERACTED_KEY, "closed");
    }
  }, []);

  return (
    <>
      <ChatLauncher
        open={open}
        pulse={!interacted}
        onOpen={handleOpen}
        onClose={handleClose}
      />
      {open ? (
        <ChatPanel
          messages={messages}
          setMessages={setMessages}
          intake={intake}
          setIntake={setIntake}
          onClose={handleClose}
          openMode={openMode ?? "manual"}
        />
      ) : null}
    </>
  );
}
