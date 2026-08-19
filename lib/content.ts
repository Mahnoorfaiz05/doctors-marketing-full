import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  CircleDollarSign,
  Code2,
  HeartHandshake,
  Megaphone,
  MonitorSmartphone,
  Palette,
  SearchCheck,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "healthcare-branding",
    title: "Healthcare Branding",
    short: "Positioning and identity",
    description: "Turn clinical expertise into a clear, credible brand that patients and partners can understand.",
    icon: Palette,
    outcomes: ["Brand strategy", "Doctor personal branding", "Messaging systems", "Visual direction"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Connected growth campaigns",
    description: "Coordinate search, content, social and follow-up around a measurable patient journey.",
    icon: Megaphone,
    outcomes: ["Growth strategy", "Campaign planning", "Patient acquisition", "Reporting"],
  },
  {
    slug: "medical-seo",
    title: "Medical SEO",
    short: "Visibility with intent",
    description: "Build a clearer path from high-intent search to the right service and appointment action.",
    icon: SearchCheck,
    outcomes: ["Technical SEO", "Local visibility", "Content architecture", "Search reporting"],
  },
  {
    slug: "medical-website-development",
    title: "Medical Website Development",
    short: "Patient-first digital experiences",
    description: "Create fast, accessible websites that explain services clearly and simplify inquiry paths.",
    icon: MonitorSmartphone,
    outcomes: ["UX strategy", "Responsive design", "Accessible development", "Conversion journeys"],
  },
  {
    slug: "healthcare-software-solutions",
    title: "Healthcare Software Solutions",
    short: "Software shaped around teams",
    description: "Design operational platforms around the way healthcare teams actually work.",
    icon: Code2,
    outcomes: ["Discovery", "Product design", "Custom platforms", "Integration planning"],
  },
  {
    slug: "medical-billing",
    title: "Medical Billing Workflows",
    short: "Operational clarity",
    description: "Improve the interfaces and handoffs around billing workflows without making reimbursement promises.",
    icon: CircleDollarSign,
    outcomes: ["Workflow mapping", "Portal interfaces", "Reporting UX", "Integration support"],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Useful, credible communication",
    description: "Build an editorial system that turns expertise into consistent, patient-friendly content.",
    icon: UsersRound,
    outcomes: ["Channel strategy", "Content systems", "Creative direction", "Community workflows"],
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising",
    short: "Campaigns with clear economics",
    description: "Connect targeting, landing pages and lead follow-up so performance can be judged responsibly.",
    icon: ChartNoAxesCombined,
    outcomes: ["Search campaigns", "Social campaigns", "Landing pages", "Lead attribution"],
  },
  {
    slug: "reputation-management",
    title: "Reputation Management",
    short: "Trust built consistently",
    description: "Create ethical review and response workflows that help practices listen and improve.",
    icon: Star,
    outcomes: ["Review workflows", "Response guidance", "Monitoring", "Experience feedback"],
  },
  {
    slug: "ai-chatbot-automation",
    title: "AI Chatbot & Automation",
    short: "Faster non-clinical follow-up",
    description: "Plan safe, clearly scoped automation for inquiries, qualification and team handoffs.",
    icon: Bot,
    outcomes: ["Assistant UX", "Lead routing", "CRM workflows", "Human escalation"],
  },
];

export const specialties = [
  "Dentists",
  "Dermatologists",
  "Cardiologists",
  "Orthopedic Specialists",
  "Plastic Surgeons",
  "Gynecologists",
  "Pediatricians",
  "Psychiatrists",
  "Physiotherapists",
  "Chiropractors",
  "Diagnostic Centers",
  "Medical Laboratories",
  "Hospitals",
  "Multi-specialty Clinics",
];

export const specialtySlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const audiences = [
  {
    title: "Doctors & specialists",
    icon: HeartHandshake,
    copy: "Build a trusted public brand and a clearer route from discovery to consultation.",
  },
  {
    title: "Clinics & hospitals",
    icon: ShieldCheck,
    copy: "Connect locations, services, campaigns and operational handoffs in one growth plan.",
  },
  {
    title: "Healthcare innovators",
    icon: BrainCircuit,
    copy: "Translate a complex health product into a credible brand, useful interface and go-to-market system.",
  },
];

export const mainNav = [
  { label: "How we work", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Who we help", href: "/specialties" },
  { label: "Insights", href: "/resources" },
  { label: "About", href: "/about" },
];

