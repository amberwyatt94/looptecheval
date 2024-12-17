const { test, expect } = require('@playwright/test');
const credentials = require('../testdata/credentials.json');

test.describe('Login Automation', () => {
  test('should successfully login to the demo app', async ({ page }) => {
    // Navigate to the demo application
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

    // Login with valid credentials
    await page.fill('#username', credentials.login.email);
    await page.fill('#password', credentials.login.password);

    // Capture logs and errors for debugging
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.error('PAGE ERROR:', err));

  // Submit the login form
  await page.click('button[type="submit"]', { force: true });

    
 // Debug and wait for any page loading
 await page.waitForTimeout(3000); // wait for any page refreshes
 console.log('Current URL:', page.url());
 await page.screenshot({ path: 'after-login.png' });

   // Wait for the correct page to be present
   await page.waitForSelector('text=Projects', { timeout: 15000 }); // Adjust this to match a valid dashboard element

   //Verify the page URL is correct
   await expect(page).toHaveURL('https://animated-gingersnap-8cf7f2.netlify.app/');





});
});
