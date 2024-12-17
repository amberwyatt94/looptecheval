const { test, expect } = require('@playwright/test');
const { login } = require('../utils'); // Adjust the path as needed
const credentials = require('../testdata/credentials.json'); // Adjust the path as needed

test('Verify "Fix navigation bug"', async ({ page }) => {
  // Reuse login functionality
  await login(page, credentials.login.email, credentials.login.password);

  // Navigate to "Web Application"
  await page.click('text=Web Application');
  await page.waitForSelector('text=To Do', { timeout: 15000 }); // Wait for the page to load

  // Locate the "Fix navigation bug" task card
  const todoTaskCard = await page.locator('div.bg-white.p-4.rounded-lg').filter({
    has: page.locator('h3:has-text("Fix navigation bug")'),
  });
  await expect(todoTaskCard).toBeVisible();

  // Verify the "Bug" tag
  const featureTag = await todoTaskCard.locator('span:has-text("Bug")');
  await expect(featureTag).toBeVisible();

  

  console.log('Task and tags are verified successfully.');
});
