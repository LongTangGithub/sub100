export const GITHUB_URL = "https://github.com/LongTangGithub/sub100";

export const INSTALL_COMMAND = "npx sub100 add button";

export const SIDEBAR_SECTIONS = [
  {
    heading: "Getting Started",
    links: [{ label: "Quickstart", href: "/docs/getting-started" }],
  },
  {
    heading: "Components",
    links: [
      { label: "Button", href: "/docs/components/button" },
      { label: "Kbd", href: "/docs/components/kbd" },
      { label: "CommandMenu", href: "/docs/components/command-menu" },
      { label: "Dialog", href: "/docs/components/dialog" },
      { label: "Toast", href: "/docs/components/toast" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Speed Lab", href: "/speed-lab" },
      { label: "Thesis", href: "/thesis" },
      { label: "GitHub", href: GITHUB_URL, external: true },
    ],
  },
] as const;
