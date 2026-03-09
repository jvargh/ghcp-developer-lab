import {
  Camera,
  Code2,
  BookOpen,
  Bot,
  Layers,
  Upload,
  Image,
  LayoutDashboard,
  Compass,
  Cpu,
  Puzzle,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import { Hero, SectionContainer, SectionTitle, FeatureCard } from "@/components/ui";

const REPO_DEMOS_URL =
  process.env.NEXT_PUBLIC_REPO_DEMOS_URL ??
  "https://github.com/jvargh/ghcp-developer-lab/tree/main/demos";

const techStack = [
  {
    icon: Code2,
    title: "Next.js 15 (App Router)",
    description:
      "Built on the latest Next.js with the App Router, Turbopack dev server, and React Server Components.",
    iconColor: "text-blue-600",
  },
  {
    icon: Cpu,
    title: "TypeScript",
    description:
      "Strict TypeScript throughout — all component props, data models, and utilities are fully typed.",
    iconColor: "text-blue-600",
  },
  {
    icon: Layers,
    title: "Tailwind CSS 4",
    description:
      "Utility-first styling with dark mode support, responsive breakpoints, and a custom design system.",
    iconColor: "text-teal-600",
  },
  {
    icon: Puzzle,
    title: "Radix UI + Framer Motion",
    description:
      "Accessible UI primitives and smooth animations for a polished, production-quality feel.",
    iconColor: "text-purple-600",
  },
];

const pages = [
  {
    icon: Image,
    title: "Gallery (/gallery)",
    description:
      "Responsive photo grid with tag-based filtering and pagination. Driven by mock photo data.",
    iconColor: "text-green-600",
  },
  {
    icon: Compass,
    title: "Explore (/explore)",
    description:
      "Browse photos by category or filter by tag to discover new work across the collection.",
    iconColor: "text-orange-600",
  },
  {
    icon: Upload,
    title: "Upload (/upload)",
    description:
      "Drag-and-drop upload zone with real-time preview and configurable privacy settings.",
    iconColor: "text-blue-600",
  },
  {
    icon: LayoutDashboard,
    title: "Admin (/admin)",
    description:
      "Dashboard with statistics, recent gallery management, and quick-action controls.",
    iconColor: "text-purple-600",
  },
];

const copilotFeatures = [
  {
    icon: BookOpen,
    title: "Features Demo",
    description:
      "Core Copilot features — chat commands, inline completions, and AI-assisted code generation.",
    iconColor: "text-blue-600",
  },
  {
    icon: GitBranch,
    title: "Engineering Practices",
    description:
      "Debugging suggestions, exporting chats, system prompts, and collaborative workflows.",
    iconColor: "text-green-600",
  },
  {
    icon: Bot,
    title: "Customize Copilot",
    description:
      "Prompt files, chat modes, custom instructions, model switching, and MCP server integration.",
    iconColor: "text-purple-600",
  },
  {
    icon: Camera,
    title: "Coding Agent",
    description:
      "Assign Copilot to GitHub issues, review AI-generated PRs, and iterate through agent sessions.",
    iconColor: "text-orange-600",
  },
];

export default function AboutPage() {
  return (
    <div className="page-gradient">
      <Hero
        title="About This Repository"
        description="A real-world Next.js photo gallery application designed as a hands-on lab for learning and demoing GitHub Copilot features."
      />

      {/* Purpose */}
      <SectionContainer bgColor="bg-white/30 dark:bg-slate-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle title="What Is This Repo?" className="text-center mb-6" />
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
            <strong className="text-slate-900 dark:text-white">Photo Gallery &amp; Portfolio</strong>{" "}
            is a production-style Next.js application that serves as the foundation for a series of
            GitHub Copilot demo labs. Rather than a toy app, it reflects real-world patterns —
            component-driven architecture, TypeScript, Tailwind CSS, mock data layers, and a full
            testing setup — so demos feel authentic and the skills transfer directly to production
            codebases.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            The{" "}
            <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-sm font-mono">
              demos/
            </code>{" "}
            folder contains five step-by-step guides that walk through Copilot's core features,
            engineering practices, customization options, collaborative Spaces, and the Coding
            Agent — all anchored to this codebase.
          </p>
        </div>
      </SectionContainer>

      {/* Tech Stack */}
      <SectionContainer>
        <SectionTitle title="Tech Stack" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              iconColor={item.iconColor}
            />
          ))}
        </div>
      </SectionContainer>

      {/* App Pages */}
      <SectionContainer bgColor="bg-white/30 dark:bg-slate-800/30">
        <SectionTitle title="Application Pages" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pages.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              iconColor={item.iconColor}
            />
          ))}
        </div>
      </SectionContainer>

      {/* Project Structure */}
      <SectionContainer>
        <SectionTitle title="Project Structure" />
        <div className="max-w-2xl mx-auto">
          <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-xl p-6 text-sm leading-relaxed overflow-x-auto">
            {`src/
├── app/               # Next.js 15 App Router pages
│   ├── page.tsx       # Home page
│   ├── about/         # This page
│   ├── admin/         # Admin dashboard
│   ├── explore/       # Explore / discover page
│   ├── gallery/       # Photo gallery page
│   └── upload/        # Upload page
├── components/
│   ├── ui/            # Reusable UI (cards, layout, stats)
│   ├── gallery/       # Gallery-specific components
│   └── upload/        # Upload zone component
└── lib/               # Mock data and utility helpers

.github/
├── copilot-instructions.md   # Global Copilot context
├── instructions/             # Scoped instruction files
├── prompts/                  # Reusable prompt files
├── skills/                   # Copilot skill definitions
├── agents/                   # Custom agent definitions
└── chatmodes/                # Custom chat modes

demos/                        # Step-by-step demo guides`}
          </pre>
        </div>
      </SectionContainer>

      {/* Copilot Demo Highlights */}
      <SectionContainer bgColor="bg-white/30 dark:bg-slate-800/30">
        <SectionTitle title="GitHub Copilot Demo Highlights" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {copilotFeatures.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              iconColor={item.iconColor}
            />
          ))}
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Explore?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Start with the demo guides or jump straight into the application to see it in action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/gallery" className="btn-primary">
              Browse Gallery
            </Link>
            <a
              href={REPO_DEMOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Demo Guides
            </a>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
