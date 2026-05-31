"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_SECTIONS } from "@/lib/site";

type SidebarProps = {
  open: boolean;
  onNavigate?: () => void;
};

export function Sidebar({ open, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      data-slot="sidebar"
      className={`${
        open ? "block" : "hidden"
      } md:block w-full md:w-60 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950`}
    >
      <nav className="py-6 px-4 space-y-6">
        {SIDEBAR_SECTIONS.map((section) => (
          <div key={section.heading}>
            <h4 className="px-2 mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {section.heading}
            </h4>
            <ul className="space-y-0.5">
              {section.links.map((link) => {
                const isActive =
                  !("external" in link && link.external) &&
                  pathname === link.href;
                const external = "external" in link && link.external;
                return (
                  <li key={link.href}>
                    {external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={onNavigate}
                        className="block px-2 py-1.5 rounded-md text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        aria-current={isActive ? "page" : undefined}
                        className={`block px-2 py-1.5 rounded-md text-sm transition-colors ${
                          isActive
                            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
