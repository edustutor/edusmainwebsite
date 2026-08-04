"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Smart app-launcher screen for /lms.
 *
 * On load it detects the visitor's device from the user agent and
 * redirects, fast, to the right destination:
 *   - Android phone / tablet -> Google Play listing
 *   - iPhone / iPad          -> Apple App Store listing
 *   - Desktop / anything else -> the web LMS (lms.edustutor.com)
 *
 * Device detection needs JavaScript, so the redirect fires from an
 * effect. We fire it on the next tick (a tiny beat, not a visible delay)
 * so the branded fallback card paints first - if the browser blocks the
 * auto-navigation, or the visitor came back, the three tap buttons below
 * are the guaranteed path. A guard ref stops it firing twice under React
 * StrictMode.
 */

const PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.edus.edustutor";
const APP_STORE_URL = "https://apps.apple.com/lk/app/edus-tutor/id6742735384";
const WEB_LMS_URL = "https://lms.edustutor.com";

type Target = "android" | "ios" | "web";

function detectTarget(ua: string): Target {
  const s = ua.toLowerCase();
  // iPadOS 13+ reports as "Macintosh" but is a touch device - catch it
  // via maxTouchPoints in the caller. Here we handle the honest strings.
  if (/android/.test(s)) return "android";
  if (/iphone|ipad|ipod/.test(s)) return "ios";
  return "web";
}

function targetUrl(t: Target): string {
  if (t === "android") return PLAY_URL;
  if (t === "ios") return APP_STORE_URL;
  return WEB_LMS_URL;
}

export function LmsRedirect() {
  const [target, setTarget] = useState<Target>("web");
  const [go, setGo] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const ua = navigator.userAgent || "";
    let t = detectTarget(ua);
    // iPadOS masquerades as desktop Safari (Macintosh) but has touch.
    if (t === "web" && /macintosh/i.test(ua) && navigator.maxTouchPoints > 1) {
      t = "ios";
    }
    setTarget(t);
    setGo(true);

    // Redirect on the next tick so the card paints first; ~1s max feel.
    const id = window.setTimeout(() => {
      window.location.href = targetUrl(t);
    }, 350);
    return () => window.clearTimeout(id);
  }, []);

  const url = targetUrl(target);
  const label =
    target === "android"
      ? "Google Play"
      : target === "ios"
        ? "the App Store"
        : "the EDUS web app";

  return (
    <div className="min-h-[78vh] flex items-center justify-center px-5 py-16">
      <div className="glass-strong rounded-[32px] p-8 sm:p-12 max-w-md w-full text-center relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="blob" style={{ top: "-10%", left: "-8%", width: 240, height: 240, background: "#2563EB", opacity: 0.2 }} />
          <span className="blob" style={{ bottom: "-14%", right: "-8%", width: 240, height: 240, background: "#8B5CF6", opacity: 0.18 }} />
          <span className="blob" style={{ top: "40%", left: "45%", width: 200, height: 200, background: "#06B6D4", opacity: 0.14 }} />
        </div>

        {/* Rocket / launch mark */}
        <span
          className="mx-auto inline-flex w-16 h-16 rounded-2xl items-center justify-center animate-pulse"
          style={{ background: "linear-gradient(135deg, #2563EB, #8B5CF6)" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3c3 1 5 4 5 8 0 2-.6 3.6-1.5 5H8.5C7.6 14.6 7 13 7 11c0-4 2-7 5-8z" />
            <circle cx="12" cy="9.5" r="1.6" />
            <path d="M8.5 16 6 19M15.5 16 18 19M12 16v3" />
          </svg>
        </span>

        <h1 className="heading mt-6" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
          {go ? <>Opening the EDUS app…</> : <>Loading EDUS…</>}
        </h1>
        <p className="mt-3 text-[#2B3950] text-[15px] leading-relaxed">
          Taking you to {label} now. If it does not open in a second, choose
          your option below.
        </p>

        {/* Primary button - the detected destination */}
        <a
          href={url}
          className="btn btn-primary w-full mt-7 justify-center text-[16px] !py-4"
        >
          Continue to {label}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

        {/* All three options, so any device can pick the right one */}
        <div className="mt-4 grid grid-cols-1 gap-2.5">
          <a href={PLAY_URL} className="btn btn-ghost w-full justify-center text-[14px] !py-3">
            <StoreIcon kind="android" />
            Get it on Google Play
          </a>
          <a href={APP_STORE_URL} className="btn btn-ghost w-full justify-center text-[14px] !py-3">
            <StoreIcon kind="apple" />
            Download on the App Store
          </a>
          <a href={WEB_LMS_URL} className="btn btn-ghost w-full justify-center text-[14px] !py-3">
            <StoreIcon kind="web" />
            Open the web app
          </a>
        </div>

        <p className="mt-5 text-[12.5px] text-[#5A6A82]">
          EDUS Online Institute - learn live from any device.
        </p>
      </div>
    </div>
  );
}

function StoreIcon({ kind }: { kind: "android" | "apple" | "web" }) {
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };
  if (kind === "apple") {
    return (
      <svg {...common} fill="#102033">
        <path d="M16.4 12.9c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.6 2.2-1.6 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 1.9-1.1 2.6-2.2.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.3-.9-2.3-3.5zM14.3 6.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z" />
      </svg>
    );
  }
  if (kind === "android") {
    return (
      <svg {...common} fill="#3DDC84">
        <path d="M5 8.5 3.6 6.1a.4.4 0 0 1 .7-.4l1.4 2.5a8 8 0 0 1 6.6 0l1.4-2.5a.4.4 0 0 1 .7.4L17 8.5A7.4 7.4 0 0 1 20 14H4a7.4 7.4 0 0 1 3-5.5zM8 11.8a.9.9 0 1 0-.9-.9c0 .5.4.9.9.9zm8 0a.9.9 0 1 0-.9-.9c0 .5.4.9.9.9z" />
        <rect x="4" y="14.6" width="16" height="6.4" rx="2.2" fill="#3DDC84" opacity="0.35" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.4 3.9 5.6 4 9-.1 3.4-1.5 6.6-4 9-2.5-2.4-3.9-5.6-4-9 .1-3.4 1.5-6.6 4-9z" />
    </svg>
  );
}
