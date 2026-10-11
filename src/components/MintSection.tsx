import { css } from "@/styles/classes";
import Image from "next/image";
import { artwork, tiers, type Tier } from "@/data/content";
import { AssetIcon } from "./Icons";

export type MintNetwork = "Ethereum" | "Arbitrum";

export default function MintSection({
  onMint,
}: {
  onMint: (tier: Tier, network: MintNetwork) => void;
}) {
  return (
    <section
      className={css("section mint-section")}
      id="mint"
      aria-labelledby="mint-title"
    >
      <Image
        className={css("section-artwork")}
        src={artwork.day}
        alt=""
        fill
        sizes="100vw"
        quality={90}
      />
      <div className={css("container mint-panel")}>
        <h2 id="mint-title">NFT Minting</h2>
        <div className={css("mint-grid")}>
          {tiers.map((tier) => (
            <article
              className={css("mint-card")}
              key={tier.id}
              aria-labelledby={`tier-${tier.id}`}
            >
              <Image
                className={css("mint-character")}
                src={tier.image}
                alt={`${tier.name} husky character`}
                width={300}
                height={300}
                sizes="(min-width: 1920px) 322px, 25vw"
              />
              <div className={css("mint-details")}>
                <h3 id={`tier-${tier.id}`}>{tier.name}</h3>
                <dl>
                  <div>
                    <dt>Bonus Rune</dt>
                    <dd>{tier.bonus}</dd>
                  </div>
                  <div>
                    <dt>Rune</dt>
                    <dd>{tier.runes}</dd>
                  </div>
                  <div>
                    <dt>Mint Price</dt>
                    <dd>${tier.price}</dd>
                  </div>
                </dl>
                <div className={css("mint-actions")}>
                  {(["Ethereum", "Arbitrum"] as const).map((network) => (
                    <button
                      key={network}
                      onClick={() => onMint(tier, network)}
                      aria-label={`Mint ${tier.name} on ${network}`}
                    >
                      <AssetIcon
                        name={network === "Ethereum" ? "ethereum" : "arbitrum"}
                      />
                      Mint
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className={css("mint-status")}>
          Reference prices · Wallet connection required · Minting not yet
          available
        </p>
      </div>
    </section>
  );
}
