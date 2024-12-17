const { test, expect } = require('@playwright/test');
const { login } = require('../utils'); // Adjust the path as needed
const credentials = require('../testdata/credentials.json'); // Adjust the path as needed

test('Verify "Design system updates status"', async ({ page }) => {
  // Reuse login functionality
  await login(page, credentials.login.email, credentials.login.password);

  // Navigate to "Web Application"
  await page.click('text=Web Application');
  await page.waitForSelector('text=In Progress', { timeout: 15000 }); // Wait for the page to load

  // Locate the "Design system updates" task card
  const inprogressTaskCard = await page.locator('div.bg-white.p-4.rounded-lg.shadow-sm').filter({
    has: page.locator('h3:has-text("Design system updates")'),
  });
  await expect(inprogressTaskCard).toBeVisible();

  // Verify the "Design" tag
  const featureTag = await inprogressTaskCard.locator('span:has-text("Design")');
  await expect(featureTag).toBeVisible();

  

  console.log('Task and tags are verified successfully.');
});
