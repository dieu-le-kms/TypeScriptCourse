import { expect, test } from "@playwright/test";

test.describe("Login", {tag: "@login"}, () => {
  test("Test 1 - Login successfully", async ({ page }) => {
    await test.step("Step 1: Go to OrangeHRM Login page", async () => {
      await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    });

    await test.step("Step 2: Enter valid username and password", async () => {
      await page.locator("input[name='username']").fill("Admin");
      await page.locator("input[name='password']").fill("admin123");
      await page.locator("button:has-text('Login')").click();
    });

    await test.step("Step 3: Verify that user is logged in successfully", async () => {
      await expect(page).toHaveURL(
        "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
      );
    });
  });

  test("Test 2 - Login unsuccessfully", async ({ page }) => {
    await test.step("Step 1: Go to OrangeHRM Login page", async () => {
      await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    });

    await test.step(`Step 2: Login with invalid username and password"`, async () => {
      await page.locator("input[name='username']").fill("Admin");
      await page.locator("input[name='password']").fill("admin1234");
      await page.locator("button:has-text('Login')").click();
    });

    await test.step("Step 3: Verify alert message is shown up", async () => {
      await expect(page.locator(":text-is('Invalid credentials')")).toBeVisible();
    });
  });
});

test.describe("Login @login", () => {
  test("Test 3 - Login successfully", async ({ page }) => {
    await test.step("Step 1: Go to OrangeHRM Login page", async () => {
      await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    });

    await test.step("Step 2: Enter valid username and password", async () => {
      await page.locator("input[name='username']").fill("Admin");
      await page.locator("input[name='password']").fill("admin123");
      await page.locator("button:has-text('Login')").click();
    });

    await test.step("Step 3: Verify that user is logged in successfully", async () => {
      await expect(page).toHaveURL(
        "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
      );
    });
  });

  test("Test 4 - Login unsuccessfully", async ({ page }) => {
    await test.step("Step 1: Go to OrangeHRM Login page", async () => {
      await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    });

    await test.step(`Step 2: Login with invalid username and password"`, async () => {
      await page.locator("input[name='username']").fill("Admin");
      await page.locator("input[name='password']").fill("admin1234");
      await page.locator("button:has-text('Login')").click();
    });

    await test.step("Step 3: Verify alert message is shown up", async () => {
      await expect(page.locator(":text-is('Invalid credentials')")).toBeVisible();
    });
  });
});

