const { test, expect } = require('@playwright/test');
const { login } = require('../utils'); // Adjust the path as needed
const credentials = require('../testdata/credentials.json'); // Adjust the path as needed

test('Verify "App icon design is Done"', async ({ page }) => {
  // Reuse login functionality
  await login(page, credentials.login.email, credentials.login.password);

  // Navigate to "Mobile Application"
  await page.click('text=Mobile Application');
  await page.waitForSelector('text=Done', { timeout: 15000 }); // Wait for the page to load

  // Locate the "App icon design" task card
  const doneTaskCard = await page.locator('div.bg-white.p-4.rounded-lg.shadow-sm').filter({
    has: page.locator('h3:has-text("App icon design")'),
  });
  await expect(doneTaskCard).toBeVisible();

  // Verify the "Design" tag
  const featureTag = await doneTaskCard.locator('span:has-text("Design")');
  await expect(featureTag).toBeVisible();

  


  

  console.log('Task and tags are verified successfully.');
});
