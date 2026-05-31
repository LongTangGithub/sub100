import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { CodeBlock } from "./components/code-block";
import { ComponentPreview } from "./components/component-preview";
import { InstallCommand } from "./components/install-command";
import { Lead } from "./components/lead";

type CodeProps = ComponentProps<"code"> & { className?: string };

function extractLanguage(className?: string): string | undefined {
  if (!className) return undefined;
  const match = /language-([\w-]+)/.exec(className);
  return match?.[1];
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    // ── Typography ─────────────────────────────────────────────────────
    h1: (props) => (
      <h1
        className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="max-w-2xl text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mt-16 mb-4"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="max-w-2xl text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-10 mb-2"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="max-w-2xl text-base leading-[1.75] text-neutral-700 dark:text-neutral-300 my-5 text-pretty"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="max-w-2xl list-disc pl-6 my-5 space-y-1.5 text-base leading-[1.75] text-neutral-700 dark:text-neutral-300"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="max-w-2xl list-decimal pl-6 my-5 space-y-1.5 text-base leading-[1.75] text-neutral-700 dark:text-neutral-300"
        {...props}
      />
    ),
    a: ({ href = "#", children, ...rest }) => {
      const isExternal = /^https?:\/\//.test(href);
      const className =
        "text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-500";
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className={className}
            {...rest}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    },
    table: (props) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table
          className="w-full text-sm text-left border-collapse table-fixed [&_th:first-child]:w-32 [&_th:nth-child(3):not(:last-child)]:w-24"
          {...props}
        />
      </div>
    ),
    thead: (props) => (
      <thead className="bg-neutral-50 dark:bg-neutral-900" {...props} />
    ),
    th: (props) => (
      <th
        className="px-3 py-2 font-medium text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-800"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="px-3 py-2 text-neutral-700 dark:text-neutral-300 border-b border-neutral-100 dark:border-neutral-900 last:border-b-0 align-top text-pretty"
        {...props}
      />
    ),

    // ── Fenced code blocks ─────────────────────────────────────────────
    pre: (props: ComponentProps<"pre">) => {
      const child = props.children as ReactElement<CodeProps> | undefined;
      if (!child || typeof child !== "object" || !("props" in child)) {
        return <pre {...props} />;
      }
      const codeProps = child.props;
      const language = extractLanguage(codeProps.className);
      const raw =
        typeof codeProps.children === "string" ? codeProps.children : "";
      return <CodeBlock language={language ?? "tsx"}>{raw}</CodeBlock>;
    },
    // Inline <code>: leave as-is (shiki only for fenced blocks).
    code: ({ children, className, ...rest }: CodeProps) => (
      <code
        className={`${className ?? ""} rounded bg-neutral-100/80 dark:bg-neutral-800/80 px-1.5 py-0.5 text-[0.9em] font-mono text-neutral-800 dark:text-neutral-200 whitespace-nowrap`}
        {...rest}
      >
        {children as ReactNode}
      </code>
    ),

    // ── Shared MDX components ─────────────────────────────────────────
    ComponentPreview,
    CodeBlock,
    InstallCommand,
    Lead,
  };
}
