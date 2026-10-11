import { css } from "@/styles/classes";
import Image from "next/image";
import { artwork, externalLinks } from "@/data/content";
import { AssetIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";

export type LinkKind = keyof typeof externalLinks;

export function SocialControl({
  kind,
  onUnavailable,
}: {
  kind: "twitter" | "discord";
  onUnavailable: (kind: LinkKind) => void;
}) {
  const label = kind === "twitter" ? "X / Twitter" : "Discord";
  const href = externalLinks[kind];
  return href ? (
    <a
      className={css("icon-button social-control")}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <AssetIcon name={kind} />
    </a>
  ) : (
    <button
      className={css("icon-button social-control")}
      aria-label={label}
      title={`${label} — official link pending`}
      onClick={() => onUnavailable(kind)}
    >
      <AssetIcon name={kind} />
    </button>
  );
}

export default function Navigation({
  onUnavailable,
}: {
  onUnavailable: (kind: LinkKind) => void;
}) {
  return (
    <header className={css("site-header")}>
      <nav className={css("navigation")} aria-label="Main navigation">
        <a
          href="#home"
          className={css("brand-link")}
          aria-label="Sybil Husky home"
        >
          <Image src={artwork.logo} width={52} height={52} alt="" preload />
        </a>
        <a href="#about">About</a>
        <a href="#mint">Mint</a>
        <a href="#calculator">Calculator</a>
        <a href="#faq">FAQ</a>
        <SocialControl kind="twitter" onUnavailable={onUnavailable} />
        <SocialControl kind="discord" onUnavailable={onUnavailable} />
        <ThemeToggle />
      </nav>
    </header>
  );
}
