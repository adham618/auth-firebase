import { expect, test } from "@playwright/test";

test("Login page", async ({ page }) => {
  await page.goto("/login");

  // Expect page to have a title Login
  await expect(page).toHaveTitle(/Login/);

  // Find an element with the text "Log in with Google" and click it
  await page.getByRole("button", { name: "Log in with Google" }).click();
});
