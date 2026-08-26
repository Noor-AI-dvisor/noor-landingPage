import {
  HelpCircleIcon,
  HourglassIcon,
  DocumentIcon,
  ChartBarIcon,
  BackpackIcon,
  CompassIcon,
  BuildingIcon,
  UsersIcon,
} from "../components/Icons";

export const PROBLEM_ITEMS = [
  {
    Icon: HelpCircleIcon, color: "var(--accent)", tilt: "l" as const,
    label: "Awareness",
    title: "Students guess, not choose",
    desc: "Most teens pick subjects based on friends or \"what seems easier\" — not a clear link to their strengths or future careers.",
  },
  {
    Icon: HourglassIcon, color: "var(--accent-2)", tilt: "r" as const,
    label: "Capacity",
    title: "Counsellors are stretched",
    desc: "One counsellor supports hundreds of students — repeating the same basic conversations instead of doing meaningful guidance.",
  },
  {
    Icon: DocumentIcon, color: "var(--accent)", tilt: "l" as const,
    label: "Tools",
    title: "Static tools for dynamic choices",
    desc: "Subject options live in long PDFs. There's no interactive way to test the fit between a student's profile and their future options.",
  },
  {
    Icon: ChartBarIcon, color: "var(--accent-2)", tilt: "r" as const,
    label: "Visibility",
    title: "Leadership has no visibility",
    desc: "School leaders can't easily see which cohorts are confident, which domains are in demand, or who still needs support.",
  },
];

export const SOLUTION_FEATURES = [
  {
    num: 1,
    title: "AI-guided conversation",
    desc: "Noor engages students through natural, adaptive dialogue — uncovering interests, strengths, and aspirations at their own pace.",
    more: "Unlike static quizzes, Noor's conversations evolve. Each session builds on the last, creating a rich, longitudinal picture of every student's journey. Students feel heard, not assessed.",
  },
  {
    num: 2,
    title: "Career domains that feel real",
    desc: "Explore 11 real-world career domains with authentic stories, day-in-the-life experiences, and subject pathway maps.",
    more: "Each domain is curated with UK-specific labour market data, growth projections, and diverse role models. Students discover careers they never knew existed — and connect them to subjects they're studying today.",
  },
  {
    num: 3,
    title: "Gamified skills journeys",
    desc: "Bite-sized 10-minute missions build transferable skills across communication, critical thinking, creativity, and more.",
    more: "Students earn points, unlock badges, and track their progress across a skills map that schools can see. Completion rates are dramatically higher than traditional career learning programmes.",
  },
  {
    num: 4,
    title: "Counsellor dashboard",
    desc: "Powerful analytics give counsellors and leaders real-time visibility into student career readiness and engagement.",
    more: "Filter by year group, subject option group, or at-risk students. Spot intervention opportunities early, evidence destination data, and demonstrate the impact of your careers programme — all in one place.",
  },
];

export const DOMAIN_TAGS = ["Healthcare", "Creative & Media", "Green Energy", "Tech & Data"];

export const WHO_CARDS = [
  {
    Icon: BackpackIcon,
    role: "Students",
    subtitle: "Grade 9–12 Students",
    desc: "Get a personalised study plan and unlock gamified skill missions tied to your actual future — not just exam results.",
    accent: "var(--accent)",
  },
  {
    Icon: CompassIcon,
    role: "Schools",
    subtitle: "Counsellors & Heads of Year",
    desc: "Stop repeating the same meeting. Let Noor handle initial guidance so you can focus on the students who truly need you.",
    accent: "var(--accent-2)",
  },
  {
    Icon: BuildingIcon,
    role: "Leadership",
    subtitle: "School Leaders",
    desc: "Get a clear cohort view: who's confident, who needs support, which career domains are trending in your school this year.",
    accent: "#0d6e5f",
  },
  {
    Icon: UsersIcon,
    role: "Parents",
    subtitle: "Parents & Families",
    desc: "See your child's pathway, skill progress, and subject choices in one place — with AI-backed clarity, not guesswork.",
    accent: "var(--accent-amber)",
  },
];

export const EARLY_ACCESS_BENEFITS = [
  {
    title: "Personalised AI guidance",
    desc: "Every student gets adaptive, one-to-one guidance instead of a single generic meeting.",
  },
  {
    title: "Counsellor dashboard",
    desc: "Real-time cohort insight — confidence, engagement, and who needs support, at a glance.",
  },
  {
    title: "Gamified skills journeys",
    desc: "11 career domains turned into bite-sized missions students actually want to finish.",
  },
  {
    title: "Instant Pathway Cards",
    desc: "A shareable study pathway, generated the moment a student finishes exploring.",
  },
];
