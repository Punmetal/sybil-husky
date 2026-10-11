"use client";

import { css } from "@/styles/classes";
import { useSyncExternalStore } from "react";
import { ThemeIcon } from "./Icons";

const subscribe = (callback: () => void) => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const updateFromSystem = () => {
    try {
      if (localStorage.getItem("sybil-theme")) return;
    } catch {
      /* Storage may be restricted. */
    }
    document.documentElement.dataset.theme = media.matches ? "dark" : "light";
    callback();
  };
  const updateFromStorage = (event: StorageEvent) => {
    if (event.key !== "sybil-theme") return;
    document.documentElement.dataset.theme =
      event.newValue === "light" || event.newValue === "dark"
        ? event.newValue
        : media.matches
          ? "dark"
          : "light";
    callback();
  };
  window.addEventListener("sybil-theme-change", callback);
  window.addEventListener("storage", updateFromStorage);
  media.addEventListener("change", updateFromSystem);
  return () => {
    window.removeEventListener("sybil-theme-change", callback);
    window.removeEventListener("storage", updateFromStorage);
    media.removeEventListener("change", updateFromSystem);
  };
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme || "light",
    () => "light",
  );
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("sybil-theme", next);
    } catch {
      /* Theme still works without persistent storage. */
    }
    window.dispatchEvent(new Event("sybil-theme-change"));
  }
  return (
    <button
      className={css("icon-button theme-toggle")}
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <ThemeIcon dark={theme === "dark"} />
    </button>
  );
}
