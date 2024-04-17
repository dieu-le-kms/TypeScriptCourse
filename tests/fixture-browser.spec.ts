import { expect, test } from "@playwright/test";

test("Browser fixture", async ({ browser }) => {
  let context_1 = await browser.newContext();
  let pageContext_1 = await context_1.newPage();
  await test.step("Step 1: Go to OrangeHRM Login page", async () => {
    await pageContext_1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  });

  await test.step("Step 2: Enter valid username and password", async () => {
    await pageContext_1.locator("input[name='username']").fill("Admin");
    await pageContext_1.locator("input[name='password']").fill("admin123");
    await pageContext_1.locator("button:has-text('Login')").click();
  });

  await test.step("Step 3: Verify that user is logged in successfully", async () => {
    await expect(pageContext_1).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  });

  let context_2 = await browser.newContext();
  let pageContext_2 = await context_2.newPage();

  await test.step("Step 4: Go to Admin page", async () => {
    await pageContext_2.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers"
    );
  });

  await test.step("Step 5: Verify login page is displayed", async () => {
    await expect(pageContext_2).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  });
});
