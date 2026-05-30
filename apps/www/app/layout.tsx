import { Toaster } from "@sub100/ui/components/toaster";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
