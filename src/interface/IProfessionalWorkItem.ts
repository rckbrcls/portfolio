import type { Route } from "next";
import type { TWorkCategory } from "./TWorkCategory";

export interface IProfessionalWorkItem {
  slug: string;
  name: string;
  description: string;
  company: string;
  meta: string;
  order: number;
  featured: boolean;
  workCategory: TWorkCategory;
  href?: Route;
}
