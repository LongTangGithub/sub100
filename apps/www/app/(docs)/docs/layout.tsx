export default function DocsContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
      {children}
    </article>
  );
}
