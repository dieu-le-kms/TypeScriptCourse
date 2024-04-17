import { expect, test } from "@playwright/test";

test.describe("Login", () => {
  test("Test 1 - Login successfully with valid username and password", async ({ page }) => {
    await test.step("Step 1: Go to OrangeHRM Login page", async () => {
      await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    });

    await test.step("Step 2: Enter valid username and password", async () => {
      await page.locator("input[name='username']").fill("Admin");
      await page.locator("input[name='password']").fill("admin123");
    });

    await test.step("Step 3: Click on Login button", async () => {
      await page.locator("button:has-text('Login')").click();
    });

    await test.step("Step 4: Verify that user is logged in successfully", async () => {
      await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    });
  });

  test("Test 2 - Show alert message when user enter invalid password", async ({ page }) => {
    let username = "Admin";
    let password = "admin1234";

    await test.step("Step 1: Go to OrangeHRM Login page", async () => {
      await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    });

    await test.step(`Step 2: Login with username: "${username}" and password: "${password}"`, async () => {
      await page.locator("input[name='username']").fill(username);
      await page.locator("input[name='password']").fill(password);
      await page.locator("button:has-text('Login')").click();
    });

    await test.step("Step 3: Verify alert message is shown up", async () => {
      await expect(page.locator(":text-is('Invalid credentials')")).toBeVisible();
    });
  });
});
