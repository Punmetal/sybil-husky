"use client";

import { css } from "@/styles/classes";
import Image from "next/image";
import { useState } from "react";
import { tiers } from "@/data/content";
import {
  estimateForMonths,
  MILESTONE_COUNT,
  milestoneMonths,
  REFERENCE_MONTHS,
} from "@/data/estimates";
import { Chevron } from "./Icons";

export default function AirdropEstimator({ onInfo }: { onInfo: () => void }) {
  const [months, setMonths] = useState(REFERENCE_MONTHS);
  return (
    <section
      className={css("section airdrop-section")}
      id="calculator"
      aria-labelledby="airdrop-title"
    >
      <div className={css("container airdrop-layout")}>
        <div className={css("airdrop-card surface-card")}>
          <div
            className={css("rewards-grid")}
            aria-live="polite"
            aria-atomic="true"
          >
            {tiers.map((tier) => {
              const estimate = estimateForMonths(tier, months);
              return (
                <div className={css("reward")} key={tier.id}>
                  <Image
                    src={tier.image}
                    alt={`${tier.name} reward illustration`}
                    width={300}
                    height={300}
                    sizes="15vw"
                  />
                  <div className={css("reward-value")}>
                    <span>Reward</span>
                    <strong>${estimate.reward.toLocaleString("en-US")}</strong>
                  </div>
                  <span className={css("reward-multiple")}>
                    {estimate.multiple}x
                  </span>
                </div>
              );
            })}
          </div>
          <label className={css("sr-only")} htmlFor="historical-period">
            Historical sample period in months before launch
          </label>
          <input
            id="historical-period"
            className={css("period-slider")}
            type="range"
            min="1"
            max={REFERENCE_MONTHS}
            value={months}
            onChange={(event) => setMonths(Number(event.target.value))}
            aria-valuetext={`${months} months before launch; illustrative estimates only`}
            aria-describedby="estimate-note"
          />
          <div
            className={css("milestones")}
            aria-label="Sample historical periods"
          >
            {Array.from({ length: MILESTONE_COUNT }, (_, i) => {
              const value = milestoneMonths(i);
              return (
                <button
                  key={i}
                  onClick={() => setMonths(value)}
                  aria-label={`Select ${value} month sample period`}
                  aria-pressed={months === value}
                  title={`${value} months`}
                />
              );
            })}
          </div>
          <p className={css("estimate-note")} id="estimate-note">
            Sybil Husky launched on the 27th of December 2023, if we had been
            operational and farming <strong>{months} month(s)</strong> prior to
            our launch we estimate the potential rewards as above.
          </p>
          <p className={css("sample-label")}>
            Illustrative sample · Linear model · No actual rewards
          </p>
        </div>
        <div className={css("airdrop-intro")}>
          <h2 id="airdrop-title">
            Estimated
            <br />
            Previous Airdrops
          </h2>
          <p>
            Like dedicated Huskies, we master our craft with patience and
            precision, key qualities in navigating the art of Sybil. Our past
            efforts have been fruitful, and we’re excited to continue our
            successful journey ahead.
          </p>
          <button className={css("button button-primary")} onClick={onInfo}>
            More info Here.
          </button>
        </div>
      </div>
      <a className={css("back-to-top")} href="#home" aria-label="Back to top">
        <Chevron direction="up" />
      </a>
    </section>
  );
}
