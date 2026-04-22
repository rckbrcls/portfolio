import {
  FileText,
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { projects } from "../../data/projects/projects";
import type { IProject } from "@/interface/IProject";

export type PortfolioRoute = "/" | "/work" | "/blog";

export interface NavigationLink {
  href: PortfolioRoute;
  label: string;
  number: string;
}

export interface ContactLink {
  title: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export const navigationLinks: NavigationLink[] = [
  { href: "/", label: "Home", number: "01" },
  { href: "/work", label: "Work", number: "02" },
  { href: "/blog", label: "Blog", number: "03" },
];

export const featuredProjectSlugs = ["dost", "polter", "converge", "duplizen"];

export const featuredProjectSummaries: Record<string, string> = {
  dost: "Commerce platform and operations flows for a growing brand.",
  polter:
    "CLI tooling for local infrastructure, pipelines, and daily workflows.",
  converge: "Native macOS timer built for focus, history, and calm routines.",
  duplizen: "Realtime social deduction game for quick web and mobile play.",
};

export const contactLinks: ContactLink[] = [
  {
    title: "Email",
    value: "erickbarcelosdev@gmail.com",
    href: "mailto:erickbarcelosdev@gmail.com",
    icon: Mail,
  },
  {
    title: "GitHub",
    value: "@rckbrcls",
    href: "https://github.com/rckbrcls",
    icon: Github,
  },
  {
    title: "LinkedIn",
    value: "/in/brcls",
    href: "https://www.linkedin.com/in/brcls/",
    icon: Linkedin,
  },
  {
    title: "Resume",
    value: "PDF",
    href: "/files/Resume.pdf",
    icon: FileText,
  },
];

export const statusCopy = {
  working: "Shipping",
  finished: "Released",
  designing: "In design",
} as const;

export const orderedProjects = [...projects].sort((left, right) => {
  const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
  const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return left.name.localeCompare(right.name);
});

const projectLookup = new Map(
  orderedProjects.map((project) => [project.slug, project]),
);

export const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
  const project = projectLookup.get(slug);
  return project ? [project] : [];
});

export function getProjectPrimaryLink(project: IProject) {
  if (project.link) {
    return { href: project.link, label: "Open project" };
  }

  if (project.gitLink) {
    return { href: project.gitLink, label: "View source" };
  }

  if (project.npmUrl) {
    return { href: project.npmUrl, label: "Open package" };
  }

  return null;
}

export function getProjectSummary(project: IProject) {
  return featuredProjectSummaries[project.slug] ?? project.description;
}

export function getProjectStackPreview(project: IProject, limit = 4) {
  return project.techStack.slice(0, limit).join(" / ");
}
