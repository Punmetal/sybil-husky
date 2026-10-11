import { css } from "@/styles/classes";
import { asset } from "@/data/content";

export function AssetIcon({
  name,
  className = "",
}: {
  name: "twitter" | "discord" | "ethereum" | "arbitrum";
  className?: string;
}) {
  // Original vector paths extracted from the supplied design-system boards.
  return (
    <img
      className={css(`asset-icon ${className}`)}
      src={asset(`icons/${name}.svg`)}
      alt=""
      width={32}
      height={32}
      aria-hidden="true"
    />
  );
}

export function Chevron({
  direction,
}: {
  direction: "left" | "right" | "up" | "down";
}) {
  return (
    <svg
      className={css(`chevron chevron-${direction}`)}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeIcon({ dark }: { dark: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      {dark ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </>
      ) : (
        <path d="M20.5 13.5A8.5 8.5 0 0 1 10.5 3.4 8.5 8.5 0 1 0 20.5 13.5Z" />
      )}
    </svg>
  );
}
