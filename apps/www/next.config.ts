import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const config: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "app/r/ui/[name]/route.ts": ["../../packages/ui/src/**/*"],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // MDX 3 supports ESM `export const frontmatter = {...}` natively — no remark frontmatter plugin needed.
    // GFM tables / strikethrough / autolinks via remark-gfm (Turbopack requires string IDs).
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [],
  },
});

export default withMDX(config);
