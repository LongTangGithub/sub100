"use client";

import { useState, useEffect } from "react";

const ITEMS = [
  "Calendar",
  "Calculator",
  "Search emoji",
  "Launch app",
  "Settings",
  "Profile",
  "Inbox",
  "Archive",
];

export function BaselineCommandMenu() {
  const [query, setQuery] = useState("");
  const [displayed, setDisplayed] = useState(ITEMS);

  const handleChange = (value: string) => {
    setQuery(value);
    // 50ms debounce — naive "optimization" that backfires
    setTimeout(() => {
      setDisplayed(
        ITEMS.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }, 50);
  };

  return (
    <div className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <input
          type="text"
          placeholder="Type a command…"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full h-11 px-4 text-sm bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
        />
      </div>
      <ul className="max-h-52 overflow-y-auto p-2 bg-white dark:bg-neutral-950 scrollbar-thin">
        {displayed.length === 0 && (
          <li className="py-8 text-center text-sm text-neutral-500">
            No results.
          </li>
        )}
        {displayed.map((item) => (
          <li
            key={item}
            className="px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-md cursor-default hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Sub100CommandMenu() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = query
    ? ITEMS.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      )
    : ITEMS;

  // keyboard nav
  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    }
  };

  return (
    <div className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <input
          type="text"
          placeholder="Type a command…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          data-speed-lab="sub100-command-menu"
          className="w-full h-11 px-4 text-sm bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
        />
      </div>
      <ul className="max-h-52 overflow-y-auto p-2 scrollbar-thin">
        {filtered.length === 0 && (
          <li className="py-8 text-center text-sm text-neutral-500">
            No results.
          </li>
        )}
        {filtered.map((item, i) => (
          <li
            key={item}
            className={`px-3 py-2.5 text-sm rounded-md cursor-default transition-colors ${
              i === selected
                ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                : "text-neutral-700 dark:text-neutral-300"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
