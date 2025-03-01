import { expect, test } from '@playwright/test';

test.describe('Custom Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('should render the login form correctly', async ({ page }) => {
    await expect(page.locator('h2:text("🔓 Login")')).toBeVisible(); // Specific for heading
    await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible();
    await expect(page.locator('button:text("🔓 Login")')).toBeVisible(); // Specific for button
  });

  test('should display an error message for invalid credentials', async ({ page }) => {
    await page.fill('input[placeholder="Enter your email"]', 'wrong@example.com');
    await page.fill('input[placeholder="Enter your password"]', 'wrongpassword');
    await page.click('button:text("🔓 Login")');

    // Make sure the text matches exactly what's displayed in the UI
    await page.waitForSelector('text="Invalid email or password"', { state: 'visible' });
    await expect(page.locator('text="Invalid email or password"')).toBeVisible();
  });
  test('should toggle password visibility', async ({ page }) => {
    await page.fill('input[placeholder="Enter your password"]', 'password123');
    // Use the aria-label for selecting the button
    await page.click('button[aria-label="Show password"]');
  
    await expect(page.locator('input[placeholder="Enter your password"]')).toHaveAttribute('type', 'text');
    await page.click('button[aria-label="Hide password"]');
    await expect(page.locator('input[placeholder="Enter your password"]')).toHaveAttribute('type', 'password');
  });
  ;

  test('should log in successfully with valid credentials', async ({ page }) => {
    await page.fill('input[placeholder="Enter your email"]', 'sagar1@gmail.com');
    await page.fill('input[placeholder="Enter your password"]', '12345');
    await page.click('button:text("🔓 Login")');

    // Update the expected URL based on actual redirection
    await expect(page).toHaveURL('http://localhost:5173/'); // Assuming '/admin' is the dashboard for users
  });

  test('should navigate to the sign-up page when clicking Register', async ({ page }) => {
    await page.click('text="Register"');
    await expect(page).toHaveURL('http://localhost:5173/register');
  });
});
