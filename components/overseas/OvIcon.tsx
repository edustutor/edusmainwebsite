import type { CSSProperties } from "react";

/**
 * Self-contained icon set for EDUS Overseas. Simple stroked line icons
 * (Lucide-style) so the overseas section does not depend on the tuition
 * site's FeatureIcon name registry. One switch, tinted via `tint`.
 */

type Props = { name: string; size?: number; tint?: string; style?: CSSProperties };

export function OvIcon({ name, size = 24, tint = "currentColor", style }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: tint,
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style,
    "aria-hidden": true,
  };

  switch (name) {
    case "counsellor": // person with check
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="m16 12 1.7 1.7L21 10" />
        </svg>
      );
    case "personalized": // sparkle / target
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3.4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
      );
    case "university": // building columns
      return (
        <svg {...common}>
          <path d="M3 10 12 4l9 6" />
          <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
          <path d="M3 21h18" />
        </svg>
      );
    case "visa": // passport / id card
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="9.5" r="2.6" />
          <path d="M8.5 16.5h7" />
        </svg>
      );
    case "scholarship": // graduation cap with star
      return (
        <svg {...common}>
          <path d="m2 8 10-4 10 4-10 4z" />
          <path d="M6 10.5V15c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-4.5" />
          <path d="M22 8v5" />
        </svg>
      );
    case "course": // book open
      return (
        <svg {...common}>
          <path d="M12 6.5C10.5 5 8 4.5 4 5v13c4-.5 6.5 0 8 1.5" />
          <path d="M12 6.5C13.5 5 16 4.5 20 5v13c-4-.5-6.5 0-8 1.5z" />
        </svg>
      );
    case "application": // document with check
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="m9 14 1.8 1.8L15 12" />
        </svg>
      );
    case "accommodation": // home
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "ielts": // message / speech
      return (
        <svg {...common}>
          <path d="M21 12a8 8 0 0 1-8 8H4l2-2.5A8 8 0 1 1 21 12z" />
          <path d="M8.5 11h7M8.5 14h4" />
        </svg>
      );
    case "departure": // plane takeoff
      return (
        <svg {...common}>
          <path d="M2 20h20" />
          <path d="M3.5 14.5 6 15l4.5-1 8-4.2c1-.5 1.2-1.8.3-2.4-.6-.4-1.4-.4-2 0L13 9 7.5 7 5.8 7.6l3.2 3-3.4 1L4 14z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.4 3.9 5.6 4 9-.1 3.4-1.5 6.6-4 9-2.5-2.4-3.9-5.6-4-9 .1-3.4 1.5-6.6 4-9z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 3h3.5l1.6 5-2 1.3a12 12 0 0 0 5.6 5.6l1.3-2 5 1.6V20a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 4.6 1.5 1.5 0 0 1 5 3z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={tint} style={style} aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.3.5.8 2.8-2.9-.8-.5.3A8.2 8.2 0 1 1 12 3.8zm-2.7 3.6c-.2 0-.5 0-.7.4-.3.4-1 1-1 2.4s1 2.8 1.2 3c.2.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.8.6-.1 1.8-.8 2-1.5.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.1-.6.1l-.9 1c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" />
        </svg>
      );
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={tint} style={style} aria-hidden>
          <path d="m12 2 2.9 6.3 6.8.7-5 4.6 1.4 6.7L12 17.8 5.9 20.3l1.4-6.7-5-4.6 6.8-.7z" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5z" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common}>
          <path d="M7 4h10v3a5 5 0 0 1-10 0z" />
          <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" />
          <path d="M12 12v4M9 20h6M10 16h4l.5 4h-5z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
