import type { IProfessionalWorkItem } from "@/interface/IProfessionalWorkItem";

export const professionalWorkItems: IProfessionalWorkItem[] = [
  {
    slug: "usd-ndf-offshore-exchange-integration",
    name: "USD NDF Offshore Exchange Integration",
    description:
      "Exchange integration for an offshore ticketing flow shaped around reliability, financial accuracy, and secure execution.",
    company: "BTG Pactual",
    meta: "Distributed systems / high availability / security",
    order: 1,
    featured: true,
    href: "/work",
  },
  {
    slug: "fx-swap-product",
    name: "FX Swap Product",
    description:
      "End-to-end product work across pricing, ticketing, persistence, and risk-sensitive workflow design.",
    company: "BTG Pactual",
    meta: "Pricing / ticketing / persistence / risk flows",
    order: 2,
    featured: true,
    href: "/work",
  },
  {
    slug: "two-way-pricing-flow",
    name: "Two-Way Pricing Flow",
    description:
      "Bidirectional pricing experience for FX products built to improve quote visibility and scale cleanly with demand.",
    company: "BTG Pactual",
    meta: "Pricing systems / product flows / quote lifecycle",
    order: 3,
    featured: true,
    href: "/work",
  },
  {
    slug: "fx-core-service-refactor",
    name: "FX Core Service Refactor",
    description:
      "Service refactor that split a large FX backend into smaller operational units with clearer ownership and better scalability.",
    company: "BTG Pactual",
    meta: ".NET / microservices / backend architecture",
    order: 4,
    featured: true,
    href: "/work",
  },
];
