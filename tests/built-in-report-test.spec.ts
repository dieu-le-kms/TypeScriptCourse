import { expect, test } from "@playwright/test";
test("Test 1 - Login successfully with valid username and password", async ({ page }) => {
  //Step 1: Go to OrangeHRM Login page
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  //Step 2: Enter valid username and password
  await page.locator("input[name='username']").fill("Admin");
  await page.locator("input[name='password']").fill("admin123");

  //Step 3: Click on Login button
  await page.locator("button:has-text('Login')").click();

  //Step 4: Verify that user is logged in successfully
  await expect(page).toHaveURL(
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
  );
});

test("Test 2 - Show alert message when user enter invalid password", async ({ page }) => {
  //Step 1: Go to OrangeHRM Login page
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  //Step 2: Enter valid username and invalid password
  await page.locator("input[name='username']").fill("Admin");
  await page.locator("input[name='password']").fill("admin1234");

  //Step 3: Click on Login button
  await page.locator("button:has-text('Login')").click();

  //Step 4: Verify alert message is shown up
  await expect(page.locator(":text-is('Invalid credentials')")).toBeVisible();
});
