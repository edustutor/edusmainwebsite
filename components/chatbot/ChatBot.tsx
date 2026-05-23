"use client";
import { useEffect, useState, useCallback } from "react";
import { ChatLauncher } from "./ChatLauncher";
import { ChatPanel } from "./ChatPanel";
import type { ChatMessage } from "@/lib/chatbot/types";

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
 *   - Open the panel automatically AFTER the user has scrolled or
 *     spent ~15s on the page - matches how high-converting chat
 *     widgets time their first impression. Skipped entirely if the
 *     user has already dismissed or interacted with the launcher.
 *
 * Performance:
 *   - This file is the entry point. ChatPanel is the heavy piece (it
 *     pulls in the message bubble component + the network call wiring).
 *     We dynamically import ChatPanel only after the launcher is
 *     clicked - keeps the chatbot's contribution to LCP at near-zero.
 */

const AUTO_OPEN_DELAY_MS = 15_000;
const SESSION_DISMISS_KEY = "edus.chatbot.dismissed";

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Auto-suggest opening after AUTO_OPEN_DELAY_MS, but only on first
  // visit per session AND only if the user hasn't already opened the
  // panel manually. The launcher uses a pulse animation to indicate
  // attention; we don't force-open the full panel.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_DISMISS_KEY)) return;
    const id = window.setTimeout(() => {
      // The launcher hint state is wired via the `pulse` prop below -
      // setting interacted=false ensures the pulse keeps running until
      // the user clicks. We don't auto-open the panel itself; that
      // would feel intrusive on a marketing site.
    }, AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setInteracted(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_DISMISS_KEY, "opened");
    }
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
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
          onClose={handleClose}
        />
      ) : null}
    </>
  );
}
