"use client";
import dynamic from "next/dynamic";

/**
 * Client-side mount point for the EDUS chatbot.
 *
 * Why this wrapper exists:
 *   - The root layout (app/layout.tsx) is a Server Component.
 *   - Next 15+/16 forbids `next/dynamic({ ssr: false })` inside Server
 *     Components ("ssr: false is not allowed with next/dynamic in
 *     Server Components"). Server components don't have a client
 *     runtime to defer to.
 *   - This file is a client component (note the "use client"
 *     directive). Inside it, ssr: false is legal - the dynamic import
 *     runs only after hydration, which is exactly what we want for a
 *     non-critical UI element that should never block LCP.
 *
 * The actual ChatBot logic lives in ChatBot.tsx. This file is just
 * the dynamic-loading shim - keep it short.
 */

const ChatBot = dynamic(
  () => import("./ChatBot").then((m) => m.ChatBot),
  {
    ssr: false,
    // No loading state - the launcher is a small floating button that
    // we don't want to flicker placeholders for. A 1-3 frame delay
    // before the button appears is invisible to users.
  },
);

export function ChatBotMount() {
  return <ChatBot />;
}
