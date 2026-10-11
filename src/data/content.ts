export const asset = (path: string) =>
  `/assets/${path.split("/").map(encodeURIComponent).join("/")}`;

export const artwork = {
  night: asset("background/BG_night_70 brightness 1.jpg"),
  day: asset("background/BG+texture Artwork 02 1.jpg"),
  logo: asset("logo/Group 24.svg"),
};

export type Tier = {
  id: string;
  name: string;
  image: string;
  bonus: string;
  runes: number;
  price: number;
  referenceReward: number;
  referenceMultiple: string;
};

// Authored values from the final desktop reference; not live blockchain data.
export const tiers: Tier[] = [
  {
    id: "mage",
    name: "Tier 1 Mage",
    image: asset("characters/1_Siberian Apprentice_R.png"),
    bonus: "0",
    runes: 100,
    price: 100,
    referenceReward: 21734,
    referenceMultiple: "217.34",
  },
  {
    id: "sorcerer",
    name: "Tier 2 Sorcerer",
    image: asset("characters/3_Siberian Sorcerer_R.png"),
    bonus: "10%",
    runes: 660,
    price: 600,
    referenceReward: 143447,
    referenceMultiple: "239.08",
  },
  {
    id: "supreme",
    name: "Tier 3 Supreme",
    image: asset("characters/4_Siberian Supreme_R.png"),
    bonus: "30%",
    runes: 1820,
    price: 1400,
    referenceReward: 395566,
    referenceMultiple: "282.55",
  },
];

export const saga = [
  "In the wintry landscapes of the crypto world, a groundbreaking project emerged—SybilHusky. Inspired by the strength and loyalty of huskies, this project aimed to redefine the experience of cryptocurrency airdrops.",
  "Users could purchase SybilHusky NFTs to enter the airdrop farming program. These NFTs transformed into loyal companions, aiding users in navigating the volatile crypto market.",
  "As users acquired and held SybilHusky NFTs, they harnessed the power of their huskies to participate in airdrop farming. The more NFTs held or the higher the tiers of NFTs, the greater the share of the airdrop farming rewards.",
];

export const teamIntroduction =
  "Our team has honed their expertise through years of engagement in the crypto sphere, driven by a shared objective of generating and extracting value through inventive and creative means. We are now convinced that the moment has come to impart this value to the public, aiming to propel the entire crypto landscape forward and establish a robust community in the process.";

export const team = [
  {
    name: "HuskyCoder",
    bio: "The enigmatic master coders orchestrating the operation, characterized by their patience and precision, embody the essence of SybilHusky. Their objective is to advance and revolutionize the practice of Sybil, infusing it with innovation.",
    pending: false,
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    name: `Team profile ${String(i + 2).padStart(2, "0")}`,
    bio: "Meet more of the pack soon. This member’s name, role, and biography will be shared when confirmed.",
    pending: true,
  })),
];

export const faqs = [
  {
    question: "What is the collection supply?",
    answer:
      "The final collection supply has not been confirmed. Check the official collection details when they are available before connecting a wallet or making a purchase.",
  },
  {
    question: "What do the different Tiers mean?",
    answer:
      "The reference describes three tiers: Mage has 100 Rune and no bonus, Sorcerer has 660 Rune and a 10% bonus, and Supreme has 1,820 Rune and a 30% bonus. Their reference mint prices are $100, $600, and $1,400. These are design reference values; live prices and distribution terms are not connected.",
  },
  {
    question: "What if you miss an airdrop?",
    answer:
      "Eligibility, claim windows, and missed-airdrop policies depend on the project’s confirmed distribution terms. Those terms are not available yet, so this preview cannot determine eligibility or recover rewards.",
  },
  {
    question: "Do my potential rewards get diluted as more people mint?",
    answer:
      "The final reward allocation rules have not been supplied. The sample calculator illustrates historical reference values; it does not model dilution or promise a share of future rewards.",
  },
  {
    question:
      "What if I unstake/did not stake my NFTs before reward distribution?",
    answer:
      "Staking requirements and snapshot timing need to be confirmed in the official distribution rules. Staking and reward distribution are not connected in this preview.",
  },
  {
    question: "If you’re so successful, why do this publicly?",
    answer:
      "While we possess great knowledge on how to hunt for airdrops, we don’t have a super large amount of funds to maximize the possibility of getting airdrops. There is a real benefit in having a large amount of funds to invest in airdrop farming, as it increases the chance of obtaining airdrops. For example, ARB required a significant volume (e.g., $250,000) to be bridged to Arbitrum One. By making our farming method public, it allows others to join, resulting in more airdrops being harvested. This, we believe, is a win-win scenario.",
  },
];

// Populate only with verified official destinations; never guess social handles.
export const externalLinks: {
  docs: string | null;
  twitter: string | null;
  discord: string | null;
} = {
  docs: null,
  twitter: null,
  discord: null,
};
