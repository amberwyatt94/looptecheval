const { test, expect } = require('@playwright/test');
const { login } = require('../utils'); // Adjust the path as needed
const credentials = require('../testdata/credentials.json'); // Adjust the path as needed

test('Verify "Push notification system is in to-do"', async ({ page }) => {
  // Reuse login functionality
  await login(page, credentials.login.email, credentials.login.password);

  // Navigate to "Mobile Application"
  await page.click('text=Mobile Application');
  await page.waitForSelector('text=To Do', { timeout: 15000 }); // Wait for the page to load

  // Locate the "Push notification system" task card
  const todoTaskCard = await page.locator('div.bg-white.p-4.rounded-lg.shadow-sm').filter({
    has: page.locator('h3:has-text("Push notification system")'),
  });
  await expect(todoTaskCard).toBeVisible();

  // Verify the "Feature" tag
  const featureTag = await todoTaskCard.locator('span:has-text("Feature")');
  await expect(featureTag).toBeVisible();

  

  console.log('Task and tags are verified successfully.');
});
