"use client";

import { css } from "@/styles/classes";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { tiers, type Tier } from "@/data/content";
import type { LinkKind } from "./Navigation";
import type { MintNetwork } from "./MintSection";

export type DialogState =
  | { kind: "mint"; tier: Tier; network: MintNetwork }
  | { kind: "guide" }
  | { kind: "estimate" }
  | { kind: "community"; destination: LinkKind };

export default function SiteDialog({
  state,
  onClose,
}: {
  state: DialogState | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!state) return;
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const priorOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = priorOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, [state]);
  if (!state) return null;
  return (
    <dialog
      ref={ref}
      className={css("site-dialog")}
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
        );
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className={css("dialog-close icon-button")}
        onClick={onClose}
        aria-label="Close dialog"
        autoFocus
      >
        ×
      </button>
      {state.kind === "mint" ? (
        <>
          <span className={css("eyebrow")}>NFT MINTING · {state.network}</span>
          <h2 id="dialog-title">
            Meet your {state.tier.name.replace(/^Tier \d /, "")}
          </h2>
          <div className={css("mint-summary")}>
            <Image
              src={state.tier.image}
              alt={state.tier.name}
              width={150}
              height={150}
            />
            <dl>
              <div>
                <dt>Reference price</dt>
                <dd>${state.tier.price}</dd>
              </div>
              <div>
                <dt>Rune</dt>
                <dd>{state.tier.runes}</dd>
              </div>
              <div>
                <dt>Bonus Rune</dt>
                <dd>{state.tier.bonus}</dd>
              </div>
            </dl>
          </div>
          <p>
            A connected wallet is required to mint. Wallet connection, a
            verified contract, and live pricing are not yet available for{" "}
            {state.network}.
          </p>
          <p className={css("dialog-notice")}>
            No wallet is connected. No transaction will be requested or
            submitted.
          </p>
          <button className={css("button button-primary")} disabled>
            Wallet connection unavailable
          </button>
          <button className={css("button button-outline")} disabled>
            Mint unavailable
          </button>
        </>
      ) : state.kind === "estimate" ? (
        <>
          <span className={css("eyebrow")}>ABOUT THE CALCULATOR</span>
          <h2 id="dialog-title">Estimates, explained.</h2>
          <p>
            The three 38-month reference rewards—$21,734, $143,447, and
            $395,566—come from the supplied design. They are sample historical
            estimates, not delivered rewards or live market data.
          </p>
          <div className={css("dialog-notice")}>
            <strong>Illustrative formula</strong>
            <p>
              Sample reward = reference reward × selected months ÷ 38. The
              displayed multiple uses reward ÷ reference mint price, except the
              original 38-month multiples are preserved exactly.
            </p>
          </div>
          <p>
            This linear model is a frontend demonstration. It does not account
            for market conditions, fees, eligibility, dilution, or actual
            distribution rules. It is not a forecast or a guarantee.
          </p>
          <button className={css("button button-primary")} onClick={onClose}>
            Explore the sample
          </button>
        </>
      ) : state.kind === "guide" ? (
        <>
          <span className={css("eyebrow")}>SYBIL HUSKY</span>
          <h2 id="dialog-title">A guide to the pack.</h2>
          <p>
            Explore the project story, the three NFT tiers, and the team. The
            official documentation URL is awaiting confirmation; this guide
            explains the reference content available in this preview.
          </p>
          <div className={css("guide-tiers")}>
            {tiers.map((tier) => (
              <div key={tier.id}>
                <strong>{tier.name}</strong>
                <span>
                  {tier.runes.toLocaleString()} Rune · {tier.bonus} bonus · $
                  {tier.price}
                </span>
              </div>
            ))}
          </div>
          <p className={css("dialog-notice")}>
            Tier prices and rewards are reference values. Minting, staking, and
            airdrop distributions require confirmed integrations and terms.
          </p>
          <a
            className={css("button button-primary")}
            href="#mint"
            onClick={onClose}
          >
            Explore NFT tiers
          </a>
          <a
            className={css("button button-outline")}
            href="#faq"
            onClick={onClose}
          >
            Project questions
          </a>
        </>
      ) : (
        <>
          <span className={css("eyebrow")}>JOIN THE PACK</span>
          <h2 id="dialog-title">Stay close to the pack.</h2>
          <p>
            The official{" "}
            {state.destination === "twitter"
              ? "X / Twitter"
              : state.destination === "docs"
                ? "documentation"
                : "Discord community"}{" "}
            link is awaiting confirmation. This preview will only send you to
            verified project destinations.
          </p>
          <p className={css("dialog-notice")}>
            Community access is not connected yet. You can keep exploring the
            project here.
          </p>
          <a
            className={css("button button-primary")}
            href="#faq"
            onClick={onClose}
          >
            Explore project questions
          </a>
        </>
      )}
    </dialog>
  );
}
