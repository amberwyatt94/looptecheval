async function login(page, email, password) {
    // Navigate to the login page
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    // Fill in login credentials
    await page.fill('#username', email);
    await page.fill('#password', password);
    // Submit the login form
    await page.click('button[type="submit"]');
    // Wait for dashboard to load
    await page.waitForSelector('text=Projects', { timeout: 15000 });
  }
  
  module.exports = { login };
  