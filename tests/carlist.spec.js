import { expect, test } from '@playwright/test';

test.describe('Car List Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/cars');

  });

  test('should render the vehicle list correctly', async ({ page }) => {
    await expect(page.locator('h1:text("Our Vehicle Collection")')).toBeVisible();
    await expect(page.locator('div.grid')).toHaveCount(1); // Assuming grid holds vehicle cards
  });

  test('should filter vehicles based on search term', async ({ page }) => {
    await page.fill('input[placeholder="Search vehicles..."]', 'Audi');
    await page.waitForTimeout(1000); // Wait for filter action, replace with a better wait if possible
    const vehicleCount = await page.locator('div[role="listitem"]').count();
    expect(vehicleCount).toBeLessThan(3); // Check if items are indeed filtered
  });


  
});
