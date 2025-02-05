import { test, expect } from "@playwright/test";

test("basic editor functionality", async ({ page }) => {
  // Navigate to the app
  await page.goto("/");

  // Wait for GrapesJS editor to be fully loaded
  await expect(page.locator(".gjs-frame")).toBeVisible();

  // Verify the editor instance
  const hasEditor = await page.evaluate(() => {
    // @ts-ignore - window.editor is added by the app
    return !!window.editor;
  });
  expect(hasEditor).toBeTruthy();

  // Check canvas is loaded
  await expect(page.locator(".gjs-cv-canvas")).toBeVisible();

  // Verify UI elements specific to our React app
  await expect(
    page.locator(".gjs-custom-editor, .gjs-default-editor")
  ).toBeVisible();

  // Check if custom components are properly rendered
  await expect(page.locator('[data-gjs-type="wrapper"]')).toBeVisible();

  // Verify components are loaded
  const hasComponents = await page.evaluate(() => {
    // @ts-ignore - window.editor is added by the app
    return window.editor.getComponents().length > 0;
  });
  expect(hasComponents).toBeTruthy();
});

test("editor state updates", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".gjs-frame")).toBeVisible();

  // Wait for initial editor state
  await expect(page.getByText("Ready:")).toBeVisible();

  // Verify ready state indication
  const readyIndicator = page.locator(".text-green-400");
  await expect(readyIndicator).toBeVisible();
});
