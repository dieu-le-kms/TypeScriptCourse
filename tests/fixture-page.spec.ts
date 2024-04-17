import { expect, test } from "@playwright/test";

test("Page fixture", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
});

