import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(process.env.NEXT_PUBLIC_ORIGIN! + "/login");

  // Expect page to have a title Login
  await expect(page).toHaveTitle(/Login/);
});

test("Log in with Google", async ({ page }) => {
  await page.goto("/login");

  // Click the get started link.
  await page.getByRole("button", { name: "Log in with Google" }).click();

  // // page redirects to "/" has heading "You are logged in"
  // await expect(page).toHaveURL("/");

  // // Expects page to have a heading with the name of You are logged in.
  // await expect(
  //   page.getByRole("heading", { name: "You are logged in" })
  // ).toBeVisible();
});
