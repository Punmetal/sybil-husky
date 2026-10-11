"use client";

import { css } from "@/styles/classes";
import { useState } from "react";
import Image from "next/image";
import { artwork, externalLinks, saga } from "@/data/content";
import Navigation, { SocialControl, type LinkKind } from "./Navigation";
import MintSection from "./MintSection";
import TeamCarousel from "./TeamCarousel";
import AirdropEstimator from "./AirdropEstimator";
import Faq from "./Faq";
import SiteDialog, { type DialogState } from "./SiteDialog";

export default function SybilSite() {
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const unavailable = (destination: LinkKind) =>
    setDialog({ kind: "community", destination });
  return (
    <>
      <a className={css("skip-link")} href="#about">
        Skip to content
      </a>
      <main>
        <section
          className={css("section hero-section")}
          id="home"
          aria-labelledby="hero-title"
        >
          <Image
            className={css("section-artwork")}
            src={artwork.night}
            alt=""
            fill
            sizes="100vw"
            preload
            quality={90}
          />
          <Navigation onUnavailable={unavailable} />
          <div className={css("container hero-content")}>
            <h1 id="hero-title">SYBIL HUSKY</h1>
            <p>
              Transform Your Life with Airdrop, Ride the Bullrun
              <br />
              Wave Don&apos;t Miss Out!
            </p>
            {externalLinks.docs ? (
              <a
                className={css("button button-hero")}
                href={externalLinks.docs}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the Docs.
              </a>
            ) : (
              <button
                className={css("button button-hero")}
                onClick={() => setDialog({ kind: "guide" })}
              >
                Read the Docs.
              </button>
            )}
          </div>
        </section>
        <section
          className={css("section saga-section")}
          id="about"
          aria-labelledby="saga-title"
        >
          <div className={css("container saga-layout")}>
            <article className={css("surface-card saga-card")}>
              <h2 id="saga-title">Saga of the Husky</h2>
              {saga.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <button
                className={css("button button-primary")}
                onClick={() => unavailable("discord")}
              >
                Join the Pack.
              </button>
            </article>
            <Image
              className={css("saga-logo")}
              src={artwork.logo}
              alt="Sybil Husky emblem"
              width={460}
              height={460}
              sizes="24vw"
            />
          </div>
        </section>
        <MintSection
          onMint={(tier, network) => setDialog({ kind: "mint", tier, network })}
        />
        <TeamCarousel />
        <AirdropEstimator onInfo={() => setDialog({ kind: "estimate" })} />
        <section
          className={css("section faq-section")}
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className={css("container faq-layout")}>
            <Faq />
            <footer className={css("site-footer")}>
              <a href="#home">Sybil Husky</a>
              <div>
                <SocialControl kind="twitter" onUnavailable={unavailable} />
                <SocialControl kind="discord" onUnavailable={unavailable} />
              </div>
            </footer>
          </div>
        </section>
      </main>
      <SiteDialog state={dialog} onClose={() => setDialog(null)} />
    </>
  );
}
