import type { TWorkCategory } from "@/interface/TWorkCategory";

export function getWorkCategoryLabel(category: TWorkCategory) {
  if (category === "professional") {
    return "Professional";
  }

  return "Independent";
}
