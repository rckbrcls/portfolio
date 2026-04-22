import type { Route } from "next";

export interface IProfessionalWorkItem {
  slug: string;
  name: string;
  description: string;
  company: string;
  meta: string;
  order: number;
  featured: boolean;
  href?: Route;
}
