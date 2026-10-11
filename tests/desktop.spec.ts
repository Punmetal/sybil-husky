import { test as base, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const test = base.extend<{ checkedConsole: void }>({
  checkedConsole: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await use();
      expect(errors, "No browser runtime or console errors").toEqual([]);
    },
    { auto: true },
  ],
});

async function loadAllArtwork(page: Page) {
  for (const section of await page.locator("main > section").all()) {
    await section.scrollIntoViewIfNeeded();
    await section.locator("img").evaluateAll(async (images) => {
      await Promise.all(
        images.map((image) => (image as HTMLImageElement).decode()),
      );
    });
  }
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 0));
}

for (const width of [1440, 1600, 1920]) {
  for (const theme of ["light", "dark"] as const) {
    test(`${width}px ${theme}: desktop layout, original assets, accessibility, screenshot`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({
        width,
        height: Math.round((width * 9) / 16),
      });
      await page.emulateMedia({ colorScheme: theme });
      const failures: string[] = [];
      page.on("response", (response) => {
        if (response.status() >= 400)
          failures.push(`${response.status()} ${response.url()}`);
      });
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await loadAllArtwork(page);
      expect(failures).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
      await expect(page.locator("main > section")).toHaveCount(6);
      for (const section of await page.locator("main > section").all()) {
        const bounds = await section.boundingBox();
        expect(bounds?.height).toBeGreaterThanOrEqual((width * 9) / 16 - 1);
      }
      for (const image of await page.locator("main img").all()) {
        expect(
          await image.evaluate(
            (image) => (image as HTMLImageElement).naturalWidth,
          ),
        ).toBeGreaterThan(0);
      }
      const violations = (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations;
      expect(
        violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
      await page.screenshot({
        path: testInfo.outputPath(`desktop-${width}-${theme}.png`),
        fullPage: true,
      });
    });
  }
}

test("theme preference persists and overrides system preference", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("sybil-theme"))).toBe(
    "dark",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("navigation, project guide, community dialogs, and back to top", async ({
  page,
}) => {
  await page.goto("/");
  for (const [name, id] of [
    ["About", "about"],
    ["Mint", "mint"],
    ["Calculator", "calculator"],
    ["FAQ", "faq"],
  ]) {
    await page
      .getByRole("navigation")
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    const bounds = await page.locator(`#${id}`).boundingBox();
    expect(Math.abs(bounds!.y)).toBeLessThan(30);
  }
  await page.getByRole("link", { name: "Back to top" }).click();
  await expect(page).toHaveURL(/#home$/);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  const docs = page.getByRole("button", { name: "Read the Docs." });
  await docs.click();
  await expect(page.getByRole("dialog")).toContainText(
    "official documentation URL is awaiting confirmation",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(docs).toBeFocused();
  await docs.click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Explore NFT tiers" })
    .click();
  await expect(page).toHaveURL(/#mint$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(Math.abs((await page.locator("#mint").boundingBox())!.y)).toBeLessThan(
    30,
  );
  await page.getByRole("button", { name: "Join the Pack." }).click();
  await expect(page.getByRole("dialog")).toContainText("Discord community");
  await page.getByRole("button", { name: "Close dialog" }).click();
  for (const name of ["X / Twitter", "Discord"]) {
    for (const control of await page
      .getByRole("button", { name, exact: true })
      .all()) {
      await control.click();
      await expect(page.getByRole("dialog")).toContainText(
        "awaiting confirmation",
      );
      await page.keyboard.press("Escape");
    }
  }
});

test("all mint actions require a wallet and never simulate a transaction", async ({
  page,
}) => {
  await page.goto("/");
  for (const tier of ["Tier 1 Mage", "Tier 2 Sorcerer", "Tier 3 Supreme"]) {
    for (const network of ["Ethereum", "Arbitrum"]) {
      await page
        .getByRole("button", { name: `Mint ${tier} on ${network}` })
        .click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toContainText(network);
      await expect(dialog).toContainText("No wallet is connected");
      await expect(
        dialog.getByRole("button", { name: "Wallet connection unavailable" }),
      ).toBeDisabled();
      await expect(
        dialog.getByRole("button", { name: "Mint unavailable" }),
      ).toBeDisabled();
      await page.keyboard.press("Tab");
      await expect(
        dialog.getByRole("button", { name: "Close dialog" }),
      ).toBeFocused();
      await page.keyboard.press("Escape");
    }
  }
});

test("carousel buttons, wraparound, pagination, and keyboard navigation", async ({
  page,
}) => {
  await page.goto("/");
  const region = page.getByRole("region", { name: "Husky team profiles" });
  const active = () => region.locator('article[aria-hidden="false"]');
  await expect(active()).toContainText("HuskyCoder");
  await page.getByRole("button", { name: "Previous team member" }).click();
  await expect(active()).toContainText("Team profile 06");
  await page.getByRole("button", { name: "Next team member" }).click();
  await expect(active()).toContainText("HuskyCoder");
  await page.getByRole("button", { name: "Show team member 3" }).click();
  await expect(active()).toContainText("Team profile 03");
  await page.keyboard.press("ArrowRight");
  await expect(active()).toContainText("Team profile 04");
  await page.keyboard.press("ArrowLeft");
  await expect(active()).toContainText("Team profile 03");
  await expect(
    page.getByRole("button", { name: "Show team member 3" }),
  ).toHaveAttribute("aria-current", "true");
});

test("historical period slider and milestones update illustrative values", async ({
  page,
}) => {
  await page.goto("/");
  const calculator = page.locator("#calculator");
  await expect(calculator).toContainText("$21,734");
  await expect(calculator).toContainText("217.34x");
  await page
    .getByRole("button", { name: "Select 1 month sample period", exact: true })
    .click();
  await expect(calculator).toContainText("$572");
  await expect(calculator).toContainText("1 month(s)");
  const slider = page.getByRole("slider");
  await slider.focus();
  await page.keyboard.press("End");
  await expect(slider).toHaveValue("38");
  await expect(calculator).toContainText("$395,566");
  await page.getByRole("button", { name: "More info Here." }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "reference reward × selected months ÷ 38",
  );
  await page.keyboard.press("Escape");
});

test("all six FAQ questions expand and collapse by keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const questions = page.locator("#faq h3 button");
  await expect(questions).toHaveCount(6);
  for (let i = 0; i < 6; i++) {
    const button = questions.nth(i);
    await button.focus();
    if ((await button.getAttribute("aria-expanded")) === "true")
      await page.keyboard.press("Enter");
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(`#faq-answer-${i}`)).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    expect(
      await questions.evaluateAll(
        (buttons) =>
          buttons.filter((b) => b.getAttribute("aria-expanded") === "true")
            .length,
      ),
    ).toBe(1);
    await page.keyboard.press("Space");
    await expect(button).toHaveAttribute("aria-expanded", "false");
  }
});

test("dark dialog contrast, modal accessibility, and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Read the Docs." }).click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  expect(
    await page
      .getByRole("dialog")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
});
