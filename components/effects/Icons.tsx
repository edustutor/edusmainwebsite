import {
  // Learning + classes
  Video,
  Clapperboard,
  GraduationCap,
  Users,
  User,
  BookOpen,
  BookMarked,
  Library,
  Sparkles,
  // Tutors
  UserCheck,
  Award,
  ShieldCheck,
  // Progress + analytics
  BarChart3,
  LineChart,
  TrendingUp,
  ClipboardList,
  ClipboardCheck,
  FileText,
  Target,
  // Time + schedule
  Clock,
  Calendar,
  CalendarClock,
  // Parents + support
  MessageCircle,
  Bell,
  Heart,
  Home,
  // Platform + tech
  Globe,
  Monitor,
  Wifi,
  Smartphone,
  // Maps + location
  MapPin,
  Map,
  Compass,
  Palmtree,
  // AI + automation
  Bot,
  Wand2,
  // Misc
  Lightbulb,
  // Subjects
  Calculator,
  Atom,
  Microscope,
  FlaskConical,
  Languages,
  PenTool,
  Coins,
  TrendingDown,
  Star,
  Briefcase,
  Receipt,
  Landmark,
  Leaf,
  Mic,
  Pencil,
  Plus,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";

/**
 * Central icon mapper - replaces every UI emoji site-wide with a Lucide
 * stroke icon. Data files reference icons by semantic name (e.g.
 * "live-class", "expert-tutor") which keeps the data layer decoupled
 * from the icon library, so swapping libraries later is one edit here.
 *
 * Country flag emojis are intentionally NOT mapped - they remain as
 * Unicode flags in the data layer.
 */

const ICONS: Record<string, LucideIcon> = {
  // Learning + classes
  "live-class": Video,
  "live-classes": Video,
  "class-recording": Clapperboard,
  "class-recordings": Clapperboard,
  "graduation": GraduationCap,
  "students": GraduationCap,
  "group-classes": Users,
  "group": Users,
  "individual-classes": User,
  "individual": User,
  "one-to-one": User,
  "book": BookOpen,
  "book-open": BookOpen,
  "book-marked": BookMarked,
  "syllabus": BookMarked,
  "library": Library,
  "resources": Library,
  "spark": Sparkles,
  "premium": Sparkles,

  // Tutors
  "expert-tutor": UserCheck,
  "expert-tutors": UserCheck,
  "qualified-tutor": UserCheck,
  "award": Award,
  "accreditation": Award,
  "shield": ShieldCheck,
  "discipline": ShieldCheck,
  "tutor-system": ShieldCheck,

  // Progress + analytics
  "parent-updates": BarChart3,
  "analytics": BarChart3,
  "exam-analytics": LineChart,
  "progress": TrendingUp,
  "monitoring": TrendingUp,
  "report": ClipboardList,
  "reporting": ClipboardList,
  "exam": ClipboardCheck,
  "exams": ClipboardCheck,
  "assignment": FileText,
  "notes": FileText,
  "target": Target,
  "focus": Target,
  "choose": Target,

  // Time + schedule
  "clock": Clock,
  "time": Clock,
  "schedule": CalendarClock,
  "flexible": CalendarClock,
  "calendar": Calendar,

  // Parents + support
  "message": MessageCircle,
  "support": MessageCircle,
  "alert": Bell,
  "notification": Bell,
  "care": Heart,
  "trust": Heart,

  // Platform + tech
  "global": Globe,
  "worldwide": Globe,
  "platform": Monitor,
  "online": Wifi,
  "mobile": Smartphone,
  "app": Smartphone,

  // Maps + location
  "location": MapPin,
  "map": Map,
  "compass": Compass,
  "island": Palmtree,
  "islands": Palmtree,

  // AI + automation
  "ai": Bot,
  "ai-helper": Bot,
  "magic": Wand2,

  // Misc
  "tip": Lightbulb,
  "idea": Lightbulb,
  "lesson": Lightbulb,
  "home": Home,
  "star": Star,
  "school": GraduationCap,
  "doubt": MessageCircle,
  "computer": Monitor,
  "tutor": UserCheck,
  "partnership": Heart,
  "growth": TrendingUp,
  "screen-share": Monitor,
  "feedback": ClipboardCheck,
  "tools": Wand2,
  "confidence": Sparkles,
  "verified": ShieldCheck,
  "secure": ShieldCheck,
  "lock": ShieldCheck,
  "consultant": UserCheck,
  "trophy": Award,
  "checkmark": ClipboardCheck,
  "completed": ClipboardCheck,

  // Subjects
  "maths": Calculator,
  "mathematics": Calculator,
  "further-maths": Calculator,
  "english": Languages,
  "language": Languages,
  "english-lit": BookOpen,
  "literature": BookOpen,
  "biology": Microscope,
  "chemistry": FlaskConical,
  "physics": Atom,
  "science": Atom,
  "writing": PenTool,
  "essay": PenTool,
  "money": Coins,
  "fee": Coins,
  "card": Coins,
  "billing": Coins,
  "rate": Coins,
  "economics": TrendingUp,
  "ict": Monitor,
  "computer-sci": Monitor,
  "discount": TrendingDown,
  "premium-tier": Star,
  "business": Briefcase,
  "business-studies": Briefcase,
  "accounting": Receipt,
  "accounts": Receipt,
  "history": Landmark,
  "environmental": Leaf,
  "nature": Leaf,
  "spoken-english": Mic,
  "speaking": Mic,
  "revision": Pencil,
  "exam-revision": Pencil,
  "plus": Plus,
  "mail": Mail,
  "email": Mail,
  "phone": Phone,
  "call": Phone,
};

export type IconName = keyof typeof ICONS;

/**
 * FeatureIcon - renders a Lucide icon at the given visual size with a
 * stroke colour derived from the supplied tint. Designed to replace
 * emoji characters that previously sat inside tinted tile containers.
 */
export function FeatureIcon({
  name,
  tint = "#2563EB",
  size = 22,
  strokeWidth = 2,
  className = "",
}: {
  name: string;
  tint?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Sparkles;
  return (
    <Icon
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      color={tint}
      className={className}
      aria-hidden
    />
  );
}
