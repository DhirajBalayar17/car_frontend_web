// import { expect, test } from '@playwright/test';

// test.describe('Registration Page Tests', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('http://localhost:5173/register'); // Adjust the URL based on your routing
//   });

//   test('should render the registration form correctly', async ({ page }) => {
//     await expect(page.locator('h2:text("Create Account")')).toBeVisible();
//     await expect(page.locator('input[name="name"]')).toBeVisible();
//     await expect(page.locator('input[name="email"]')).toBeVisible();
//     await expect(page.locator('input[name="phone"]')).toBeVisible();
//     await expect(page.locator('input[name="password"]')).toBeVisible();
//     await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
//   });

//   test('should show error for empty submissions', async ({ page }) => {
//     await page.click('button:text("Register")');
//     await expect(page.locator('text="All fields are required"')).toBeVisible();
//   });

//   test('should show error for password mismatch', async ({ page }) => {
//     await page.fill('input[name="name"]', 'John Doe');
//     await page.fill('input[name="email"]', 'john@example.com');
//     await page.fill('input[name="phone"]', '1234567890');
//     await page.fill('input[name="password"]', 'password123');
//     await page.fill('input[name="confirmPassword"]', 'different123');
//     await page.click('button:text("Register")');
//     await expect(page.locator('text="Passwords do not match"')).toBeVisible();
//   });

//   test('should register successfully and redirect to login', async ({ page }) => {
//     await page.fill('input[name="name"]', 'John Doe');
//     await page.fill('input[name="email"]', 'john@example.com');
//     await page.fill('input[name="phone"]', '1234567890');
//     await page.fill('input[name="password"]', 'password123');
//     await page.fill('input[name="confirmPassword"]', 'password123');
//     await page.click('button:text("Register")');
//     // Assuming success leads to a redirect to the login page
//     await expect(page).toHaveURL('http://localhost:5173/login');
//     await expect(page.locator('text="Registration successful! Redirecting..."')).toBeVisible();
//   });
// });
