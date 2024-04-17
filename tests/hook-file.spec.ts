import { Page, expect, test } from "@playwright/test";

let page: Page;

test.beforeAll(async () => {
  await test.step("Before all step", async () => {    
  });
});

test.afterAll(async () => {
  await test.step("After all step", async () => {
  });
});

test.beforeEach(async ({ browser }) => {
  await test.step("Before each step: Go to OrangeHRM Login page", async () => {
    page = await browser.newPage();   
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  });
});

test.afterEach(async () => {
  await test.step("After each step: Close the page", async () => {
    await page.close();
  });
});
test("Test 1 - Login successfully", async () => {
  await test.step("Step 1: Enter valid username and password", async () => {
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button:has-text('Login')").click();
  });

  await test.step("Step 2: Verify that user is logged in successfully", async () => {
    await expect(page).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  });
});

test("Test 2 - Login unsuccessfully", async () => {
  await test.step(`Step 1: Login with invalid username and password"`, async () => {
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin1234");
    await page.locator("button:has-text('Login')").click();
  });

  await test.step("Step 2: Verify alert message is shown up", async () => {
    await expect(page.locator(":text-is('Invalid credentials')")).toBeVisible();
  });
});
