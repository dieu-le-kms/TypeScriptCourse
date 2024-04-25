
import { Locator, expect, test } from '@playwright/test';
import { log } from 'console';

test('Verify user can create an order @homework', async ({ page }) => {
  const productName = 'iPhone 13 PRO';
  const userEmailLocator = page.locator('#userEmail');
  const userPasswordLocator = page.locator('#userPassword');
  const loginButton = page.getByRole('button', { name: 'Login' });
  const addToCartButton = (productName: string) => page.locator('.card').filter({ hasText: productName }).locator('button').filter({ hasText: ' Add To Cart' });
  const myOrdersButton = page.locator(`button[routerlink='/dashboard/myorders']`);
  const dashboardButton = page.locator(`button[routerlink='/dashboard/']`);
  const cartButton = page.locator(`button[routerlink='/dashboard/cart']`);
  const deleteButton = page.getByRole('button', { name: 'Delete' });
  const checkoutButton = page.getByRole('button', { name: 'Checkout❯' });
  const countryTextbox = page.getByRole('textbox', { name: 'Select Country' });
  const vietnamOption = page.locator(`//span[normalize-space(text())='Vietnam']`);
  const submitButton = page.locator(`a[class*='action__submit']`);
  const orderNumberByProductName = (name: string) => page.locator(`tr[class='ng-star-inserted']`).filter({ hasText: name }).locator(`th[scope]`);
  const yourOrderLabel = page.getByText('Your Orders');

  await test.step('Navigate to the website and login', async () => {
    await page.goto('https://rahulshettyacademy.com/client');
    await userEmailLocator.fill('rahulshetty@gmail.com');
    await userPasswordLocator.fill('Iamking@000');
    await loginButton.click();
    await expect(addToCartButton(productName)).toBeVisible();
  });

  await test.step('Delete all products which still in order list', async () => {
    await myOrdersButton.click();
    await expect(yourOrderLabel).toBeVisible();
    await page.waitForTimeout(2000);
    const deleteButtons = await deleteButton.all();
    deleteButtons.forEach(async btn => {
      await btn.click();
      await page.waitForResponse(resp => resp.url().includes('/delete-order') && resp.request().method() === 'DELETE');
      await page.waitForResponse(resp => resp.url().includes('/get-orders-for-customer') && resp.request().method() === 'GET');
    });
    await expect(deleteButton.first()).toBeHidden();
  });

  await test.step('Add a product to cart and checkout', async () => {
    await dashboardButton.click();
    await expect(addToCartButton(productName)).toBeVisible();
    await addToCartButton(productName).click();

    await cartButton.click();
    await checkoutButton.click();
    await countryTextbox.fill('Viet');
    //click backspace to remove 1 character
    await page.keyboard.press('Backspace');
    await vietnamOption.click();
    await submitButton.click();
  });

  await test.step('Verify the order number', async () => {
    //wait a little bit then get the order number from the URL
    await page.waitForTimeout(2000);
    const currentURL = page.url();
    const match = currentURL.match(/%5B%22(.*?)%22%5D/);
    const expectedOrderNumber = match ? match[1] : null;
    await myOrdersButton.click();
    await page.waitForResponse(resp => resp.url().includes('/get-orders-for-customer') && resp.request().method() === 'GET');
    await expect(orderNumberByProductName('IPHONE 13 PRO').first()).toHaveText(expectedOrderNumber!);
  });
});

test.describe('Login feature tests', () => {
  let userEmailLocator: Locator;
  let userPasswordLocator: Locator;
  let loginButton: Locator;
  let requiredUserNameErrorLabel: Locator;
  let requiredPasswordErrorLabel: Locator;
  let adminMenu: Locator;
  let addNewUserButton: Locator;
  let userNameInput: Locator;
  let passwordInput: Locator;
  let confirmPassInput: Locator;
  let userRoleInput: Locator;
  let statusInput: Locator;
  let employeeNameInput: Locator;
  let saveButton: Locator;
  let firstEmployeeOption: Locator;
  let userMenu: Locator;
  let logoutButton: Locator;

  const rootUserName = 'Admin';
  const rootPassword = 'admin123';

  const newUser = `myNewUserTest${Date.now()}`;
  const newUserPassword = 'loremipsum123';

  test.beforeEach(async ({ page }) => {
    userEmailLocator = page.getByRole('textbox', { name: 'Username' });
    userPasswordLocator = page.getByRole('textbox', { name: 'Password' });
    loginButton = page.getByRole('button', { name: 'Login' });
    requiredUserNameErrorLabel = page.locator(`//div[.//input[@name='username']]/following-sibling::span[text()='Required']`);
    requiredPasswordErrorLabel = page.locator(`//div[.//input[@name='password']]/following-sibling::span[text()='Required']`);
    adminMenu = page.getByRole('link', { name: 'Admin' });
    addNewUserButton = page.locator(`//button[contains(.,'Add')]`);
    userNameInput = page.locator(`//div[contains(@class,'oxd-input-group') and .//label[text()='Username']]/following-sibling::div//input`);
    passwordInput = page.locator(`//div[contains(@class,'oxd-input-group') and .//label[text()='Password']]/following-sibling::div//input`);
    confirmPassInput = page.locator(`//div[contains(@class,'oxd-input-group') and .//label[text()='Confirm Password']]/following-sibling::div//input`);
    userRoleInput = page.locator(`//div[contains(@class,'oxd-input-group') and .//label[text()='User Role']]/following-sibling::div//div[contains(@class,'select-text--active')]`);
    statusInput = page.locator(`//div[contains(@class,'oxd-input-group') and .//label[text()='Status']]/following-sibling::div//div[contains(@class,'select-text--active')]`);
    employeeNameInput = page.locator(`//div[contains(@class,'oxd-input-group') and .//label[text()='Employee Name']]/following-sibling::div//input`);
    firstEmployeeOption = page.locator(`//div[contains(@class,'oxd-input-group') and .//label[text()='Employee Name']]/following-sibling::div`).getByRole('option').first();
    saveButton = page.getByRole('button', { name: 'Save' });

    userMenu = page.locator(`.oxd-userdropdown`);
    logoutButton = page.getByRole('menuitem', { name: 'Logout' });

    //login to system with root user and create a new user
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await userEmailLocator.fill(rootUserName);
    await userPasswordLocator.fill(rootPassword);
    await loginButton.click();
    await expect(page).toHaveURL(/.*dashboard/);
    await adminMenu.click();
    await addNewUserButton.click();
    await userRoleInput.click();

    await page.getByRole('option', { name: 'Admin' }).click();
    await employeeNameInput.fill('a');
    await page.waitForTimeout(2000);
    await firstEmployeeOption.click();
    await statusInput.click();
    await page.getByRole('option', { name: 'Enabled' }).click();
    await userNameInput.fill(newUser);
    await passwordInput.fill(newUserPassword);
    await confirmPassInput.fill(newUserPassword);
    await saveButton.click();

    const res = await page.waitForResponse(resp => resp.url().includes('/user') && resp.request().method() === 'POST');
    expect(res.status()).toBe(200);

    await userMenu.click();
    await logoutButton.click();
  });

  test('Login with valid credential @homework', async ({ page }) => {
    await userEmailLocator.fill(newUser);
    await userPasswordLocator.fill(newUserPassword);
    await loginButton.click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Login with invalid credential', async () => {
    await userPasswordLocator.fill('admin123');
    await loginButton.click();
    await expect(requiredUserNameErrorLabel).toBeVisible();
    await expect(requiredPasswordErrorLabel).toBeHidden();
  });
});