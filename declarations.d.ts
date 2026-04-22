declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXContent: ComponentType<Record<string, unknown>>;
  export default MDXContent;
  export const frontmatter: Record<string, unknown>;
}

declare global {
  interface NodeRequire {
    context(
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp,
    ): {
      keys(): string[];
      <T = unknown>(id: string): T;
      resolve(id: string): string;
      id: string;
    };
  }
}

export {};
