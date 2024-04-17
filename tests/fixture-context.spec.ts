import { expect, test } from "@playwright/test";
test("Context fixture", async ({ context }) => {
  let page = await context.newPage();
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

  let page2 = await context.newPage();

  await test.step("Step 4: Go to Admin page", async () => {
    await page2.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers"
    );
  });

  await test.step("Step 5: Verify the header contains 'Admin'", async () => {
    await expect(page2.locator(".oxd-topbar-header-breadcrumb")).toContainText(
      "Admin"
    );
  });
});
