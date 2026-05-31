import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

type CodeBlockProps = {
  children: string;
  language?: string;
  showCopy?: boolean;
};

export async function CodeBlock({
  children,
  language = "tsx",
  showCopy = true,
}: CodeBlockProps) {
  const code = typeof children === "string" ? children.trimEnd() : "";

  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div className="relative group rounded-lg overflow-hidden bg-[#0d1117] border border-neutral-200 dark:border-neutral-800">
      {showCopy && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton value={code} />
        </div>
      )}
      <div
        className="text-sm [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:font-mono"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki HTML is server-generated, trusted.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
