import { test, expect, Page } from 'playwright/test';
 test.use({ storageState: { cookies: [], origins: [] } });

test('login test', async ({ page }: { page: Page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').click();
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="email"]').press('Tab');
  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
});