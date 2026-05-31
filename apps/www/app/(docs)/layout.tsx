import { DocsChrome } from "@/components/docs-chrome";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsChrome>{children}</DocsChrome>;
}
