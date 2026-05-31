"use client";

import { CommandMenu, toast } from "@sub100/ui";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { GITHUB_URL, INSTALL_COMMAND } from "@/lib/site";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DocsChrome({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const go = (href: string) => router.push(href);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Topbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <div className="flex flex-1">
        <Sidebar
          open={sidebarOpen}
          onNavigate={() => setSidebarOpen(false)}
        />
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <CommandMenu label="Docs command menu">
        <CommandMenu.Input placeholder="Search docs or jump to a component…" />
        <CommandMenu.List>
          <CommandMenu.Empty>No results.</CommandMenu.Empty>

          <CommandMenu.Group heading="Components">
            <CommandMenu.Item onSelect={() => go("/docs/components/button")}>
              View Button
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => go("/docs/components/kbd")}>
              View Kbd
            </CommandMenu.Item>
            <CommandMenu.Item
              onSelect={() => go("/docs/components/command-menu")}
            >
              View CommandMenu
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => go("/docs/components/dialog")}>
              View Dialog
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => go("/docs/components/toast")}>
              View Toast
            </CommandMenu.Item>
          </CommandMenu.Group>

          <CommandMenu.Group heading="Getting Started">
            <CommandMenu.Item onSelect={() => go("/docs/getting-started")}>
              Quickstart
            </CommandMenu.Item>
            <CommandMenu.Item
              onSelect={() => go("/docs/getting-started#install")}
            >
              Install CLI
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => go("/thesis")}>
              View Thesis
            </CommandMenu.Item>
          </CommandMenu.Group>

          <CommandMenu.Group heading="Resources">
            <CommandMenu.Item onSelect={() => go("/speed-lab")}>
              Speed Lab
            </CommandMenu.Item>
            <CommandMenu.Item
              onSelect={() => {
                window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
              }}
            >
              Open GitHub
            </CommandMenu.Item>
            <CommandMenu.Item
              onSelect={async () => {
                await navigator.clipboard.writeText(INSTALL_COMMAND);
                toast.success("Install command copied");
              }}
            >
              Copy install command
            </CommandMenu.Item>
          </CommandMenu.Group>
        </CommandMenu.List>
      </CommandMenu>
    </div>
  );
}
