"use client";

import { Button, CommandMenu, toast } from "@sub100/ui";
import { useState } from "react";

export function BasicDemo() {
  const [open, setOpen] = useState(false);
  const pick = (label: string) => {
    toast.success(`Opened ${label}`);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open command menu
      </Button>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Opens an overlay over the entire page.
      </p>
      <CommandMenu open={open} onOpenChange={setOpen}>
        <CommandMenu.Input placeholder="Type a command…" />
        <CommandMenu.List>
          <CommandMenu.Empty>No results.</CommandMenu.Empty>
          <CommandMenu.Group heading="Suggestions">
            <CommandMenu.Item onSelect={() => pick("Calendar")}>
              Calendar
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => pick("Search emoji")}>
              Search emoji
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => pick("Calculator")}>
              Calculator
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => pick("Launch app")}>
              Launch app
            </CommandMenu.Item>
          </CommandMenu.Group>
        </CommandMenu.List>
      </CommandMenu>
    </div>
  );
}

export function GroupedDemo() {
  const [open, setOpen] = useState(false);
  const pick = (label: string) => {
    toast.success(`Selected ${label}`);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open grouped menu
      </Button>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Opens an overlay over the entire page.
      </p>
      <CommandMenu open={open} onOpenChange={setOpen}>
        <CommandMenu.Input placeholder="Search commands…" />
        <CommandMenu.List>
          <CommandMenu.Empty>No results.</CommandMenu.Empty>

          <CommandMenu.Group heading="Suggestions">
            <CommandMenu.Item onSelect={() => pick("Profile")}>
              Profile
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => pick("Inbox")}>
              Inbox
            </CommandMenu.Item>
          </CommandMenu.Group>

          <CommandMenu.Group heading="Actions">
            <CommandMenu.Item onSelect={() => pick("New project")}>
              New project
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => pick("Invite teammate")}>
              Invite teammate
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => pick("Archive")}>
              Archive
            </CommandMenu.Item>
          </CommandMenu.Group>

          <CommandMenu.Group heading="Settings">
            <CommandMenu.Item onSelect={() => pick("Theme")}>
              Theme
            </CommandMenu.Item>
            <CommandMenu.Item onSelect={() => pick("Keyboard shortcuts")}>
              Keyboard shortcuts
            </CommandMenu.Item>
          </CommandMenu.Group>
        </CommandMenu.List>
      </CommandMenu>
    </div>
  );
}
