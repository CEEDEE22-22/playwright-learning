import { test, expect } from "@playwright/test";

test.describe("Home page with no auth", () => {
 test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-no-auth.png", {
      maxDiffPixelRatio: 0.2,
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check sign in", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page.getByTestId("nav-sign-in")).toHaveText('Sign in');
  });

  test("validate page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop/i);
  });

  test("grid loads with 9 items", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
  });

  test("search for Thor Hammer", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });

test("search for Pliers", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Pliers");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(4);
    await expect(page.getByTestId('product-name').nth(0)).toContainText('Combination Pliers');
    await expect(page.getByTestId('product-name').nth(1)).toContainText('Pliers');
    await expect(page.getByTestId('product-name').nth(2)).toContainText('Long Nose Pliers');
    await expect(page.getByTestId('product-name').nth(3)).toContainText('Slip Joint Pliers');
  });



});

test.describe("Home page customer 01 auth", () => {
  test.use({ storageState: "auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test authorized", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-customer01.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });
  test("check customer 01 is signed in", async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  });
});