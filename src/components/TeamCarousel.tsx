"use client";

import { css } from "@/styles/classes";
import Image from "next/image";
import { useState } from "react";
import { artwork, team, teamIntroduction } from "@/data/content";
import { Chevron } from "./Icons";

export default function TeamCarousel() {
  const [index, setIndex] = useState(0);
  const move = (step: number) =>
    setIndex((current) => (current + step + team.length) % team.length);
  return (
    <section
      className={css("section team-section")}
      id="team"
      aria-labelledby="team-title"
    >
      <div className={css("container")}>
        <div className={css("team-banner")}>
          <Image
            src={artwork.day}
            alt="Pink Arctic mountains, a sunset, and the husky castle beside the lake"
            fill
            sizes="74vw"
            quality={90}
          />
        </div>
        <div className={css("team-layout")}>
          <div className={css("team-intro")}>
            <h2 id="team-title">The Husky Team</h2>
            <p>{teamIntroduction}</p>
          </div>
          <div
            className={css("carousel")}
            role="region"
            aria-roledescription="carousel"
            aria-label="Husky team profiles"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                move(event.key === "ArrowRight" ? 1 : -1);
              }
            }}
          >
            <div className={css("carousel-row")}>
              <button
                className={css("carousel-arrow icon-button")}
                aria-label="Previous team member"
                onClick={() => move(-1)}
              >
                <Chevron direction="left" />
              </button>
              <div className={css("team-window")}>
                <div
                  className={css("team-track")}
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {team.map((member, i) => (
                    <article
                      key={i}
                      className={css("team-card surface-card")}
                      aria-hidden={i !== index}
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${team.length}`}
                    >
                      <h3>{member.name}</h3>
                      <p>{member.bio}</p>
                      {member.pending && (
                        <span className={css("pending-profile")}>
                          Profile pending confirmation
                        </span>
                      )}
                    </article>
                  ))}
                </div>
              </div>
              <button
                className={css("carousel-arrow icon-button")}
                aria-label="Next team member"
                onClick={() => move(1)}
              >
                <Chevron direction="right" />
              </button>
            </div>
            <div className={css("carousel-pagination")}>
              {team.map((member, i) => (
                <button
                  key={i}
                  aria-label={`Show team member ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={css(i === index ? "is-active" : "")}
                  onClick={() => setIndex(i)}
                >
                  <span />
                </button>
              ))}
            </div>
            <span
              className={css("sr-only")}
              aria-live="polite"
              aria-atomic="true"
            >
              {team[index].name}, profile {index + 1} of {team.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
