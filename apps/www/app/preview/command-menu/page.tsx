"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@sub100/ui/components/button";
import { CommandMenu } from "@sub100/ui/components/command-menu";

export default function CommandMenuPreview() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [paintMs, setPaintMs] = useState<number | null>(null);

    const handleControlledOpenChange = (next: boolean) => {
        if (next) {
            const t0 = performance.now();
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setPaintMs(performance.now() - t0);
                });
            });
        }
        setOpen(next);
    };

    return (
        <main className="min-h-screen p-12 flex flex-col gap-12 max-w-2xl dark:bg-neutral-950">
            <div>
                <h1 className="text-2xl font-semibold mb-1 text-balance dark:text-neutral-100">
                    CommandMenu
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
                    Headline composition. Press ⌘K (or Ctrl+K on Win/Linux) to open.
                </p>
            </div>

            <section className="flex flex-col gap-4">
                <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Global ⌘K (uncontrolled)
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
                    Press ⌘K anywhere on this page. Navigation actions auto-close the menu.
                </p>
                <CommandMenu>
                    <CommandMenu.Input placeholder="Type a command or search..." />
                    <CommandMenu.List>
                        <CommandMenu.Empty>No results found.</CommandMenu.Empty>
                        <CommandMenu.Group heading="Components">
                            <CommandMenu.Item value="search components" onSelect={() => console.log("search components")}>
                                Search components
                                <CommandMenu.Shortcut shortcut="mod+f" />
                            </CommandMenu.Item>
                            <CommandMenu.Item value="open button preview" onSelect={() => router.push("/preview/button")}>
                                Open Button preview
                            </CommandMenu.Item>
                            <CommandMenu.Item value="open kbd preview" onSelect={() => router.push("/preview/kbd")}>
                                Open Kbd preview
                            </CommandMenu.Item>
                        </CommandMenu.Group>
                        <CommandMenu.Group heading="Resources">
                            <CommandMenu.Item value="open github" onSelect={() => { window.open("https://github.com/LongTangGithub/sub100", "_blank"); }}>
                                Open GitHub
                            </CommandMenu.Item>
                            <CommandMenu.Item value="copy install command" onSelect={() => navigator.clipboard.writeText("npx sub100 add button")}>
                                Copy install command
                                <CommandMenu.Shortcut shortcut="mod+i" />
                            </CommandMenu.Item>
                        </CommandMenu.Group>
                        <CommandMenu.Group heading="Preferences">
                            <CommandMenu.Item value="toggle theme" onSelect={() => console.log("toggle theme")}>
                                Toggle theme
                                <CommandMenu.Shortcut shortcut="mod+shift+t" />
                            </CommandMenu.Item>
                        </CommandMenu.Group>
                    </CommandMenu.List>
                </CommandMenu>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Controlled trigger
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
                    Opened from a button. Same component, consumer owns the open state.
                </p>
                <Button onPress={() => handleControlledOpenChange(true)}>
                    Open command menu
                </Button>
                <CommandMenu open={open} onOpenChange={handleControlledOpenChange}>
                    <CommandMenu.Input placeholder="Type a command..." />
                    <CommandMenu.List>
                        <CommandMenu.Empty>No results found.</CommandMenu.Empty>
                        <CommandMenu.Group heading="Actions">
                            <CommandMenu.Item value="open button preview" onSelect={() => router.push("/preview/button")}>
                                Open Button preview
                            </CommandMenu.Item>
                            <CommandMenu.Item value="open github" onSelect={() => { window.open("https://github.com/LongTangGithub/sub100", "_blank"); }}>
                                Open GitHub
                            </CommandMenu.Item>
                        </CommandMenu.Group>
                    </CommandMenu.List>
                </CommandMenu>
            </section>

            <div className="font-mono tabular-nums text-xs text-neutral-500 dark:text-neutral-400">
                Open-to-paint: {paintMs?.toFixed(1) ?? "—"} ms
            </div>
        </main>
    );
}
