"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { createContext, useContext, useEffect, useState } from "react";
import { useMotion } from "../hooks/use-motion";
import { formatShortcut } from "../lib/format-shortcut";
import { springs } from "../lib/springs";
import { Kbd } from "./kbd";
import { commandMenuVariants } from "./command-menu.variants";

const styles = commandMenuVariants();

const CommandMenuCloseContext = createContext<() => void>(() => {});

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  label?: string;
}

function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  const platform =
    // biome-ignore lint/suspicious/noExplicityAny: userAgentData not yet in lib.dom
    (
      (navigator as any).userAgentData?.platform ??
      navigator.platform ??
      ""
    ).toLowerCase();
  return platform.includes("mac");
}

function CommandMenuRoot({
  open,
  onOpenChange,
  children,
  label = "Command menu",
}: CommandMenuProps) {
  const motion = useMotion(springs.reveal);
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);

  useEffect(() => {
    if (isControlled || typeof window === "undefined") return;

    function onKeyDown(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      const modifier = isMac() ? e.metaKey : e.ctrlKey;
      if (k === "k" && modifier) {
        e.preventDefault();
        setInternalOpen((prev) => !prev);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isControlled]);

  const dialogOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay()} />
        <Dialog.Content
          aria-label={label}
          className={styles.content({
            className:
              "data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
          })}
          style={{
            transitionProperty: "transform, opacity",
            transitionDuration: `${motion.duration}ms`,
            transitionTimingFunction: motion.easing,
          }}
        >
          <Dialog.Title className="sr-only">{label}</Dialog.Title>
          <CommandMenuCloseContext.Provider
            value={() => handleOpenChange(false)}
          >
            <Command label={label}>{children}</Command>
          </CommandMenuCloseContext.Provider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CommandMenuInput(props: React.ComponentProps<typeof Command.Input>) {
  return <Command.Input className={styles.input()} {...props} />;
}

function CommandMenuList(props: React.ComponentProps<typeof Command.List>) {
  return <Command.List className={styles.list()} {...props} />;
}

function CommandMenuEmpty(props: React.ComponentProps<typeof Command.Empty>) {
  return <Command.Empty className={styles.empty()} {...props} />;
}

interface GroupProps extends React.ComponentProps<typeof Command.Group> {
  heading?: string;
}

function CommandMenuGroup({ heading, children, ...props }: GroupProps) {
  return (
    <Command.Group className={styles.group()} heading={heading} {...props}>
      {children}
    </Command.Group>
  );
}

interface ItemProps
  extends Omit<React.ComponentProps<typeof Command.Item>, "onSelect"> {
  onSelect?: (value: string) => void | Promise<void>;
  closeOnSelect?: boolean;
}

function CommandMenuItem({
  onSelect,
  closeOnSelect = true,
  ...props
}: ItemProps) {
  const close = useContext(CommandMenuCloseContext);

  return (
    <Command.Item
      className={styles.item()}
      onSelect={(value) => {
        onSelect?.(value);
        if (closeOnSelect) close();
      }}
      {...props}
    />
  );
}

function CommandMenuShortcut({ shortcut }: { shortcut: string }) {
  return (
    <span className={styles.shortcut()}>
      {formatShortcut(shortcut).map((key) => (
        <Kbd key={key} size="sm">
          {key}
        </Kbd>
      ))}
    </span>
  );
}

export const CommandMenu = Object.assign(CommandMenuRoot, {
  Input: CommandMenuInput,
  List: CommandMenuList,
  Empty: CommandMenuEmpty,
  Group: CommandMenuGroup,
  Item: CommandMenuItem,
  Shortcut: CommandMenuShortcut,
});
