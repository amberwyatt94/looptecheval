const { test, expect } = require('@playwright/test');
const { login } = require('../utils'); // Adjust the path as needed
const credentials = require('../testdata/credentials.json'); // Adjust the path as needed

test('Verify "Offline mode is in Progress"', async ({ page }) => {
  // Reuse login functionality
  await login(page, credentials.login.email, credentials.login.password);

  // Navigate to "Mobile Application"
  await page.click('text=Mobile Application');
  await page.waitForSelector('text=In Progress', { timeout: 15000 }); // Wait for the page to load

  // Locate the "Offline mode" task card
  const inprogressTaskCard = await page.locator('div.bg-white.p-4.rounded-lg.shadow-sm').filter({
    has: page.locator('h3:has-text("Offline")'),
  });
  await expect(inprogressTaskCard).toBeVisible();

  // Verify the "Feature" tag
  const featureTag = await inprogressTaskCard.locator('span:has-text("Feature")');
  await expect(featureTag).toBeVisible();

  // Verify the "High Priority" tag
  const priorityTag = await inprogressTaskCard.locator('span:has-text("High Priority")');
  await expect(featureTag).toBeVisible();


  

  console.log('Task and tags are verified successfully.');
});
