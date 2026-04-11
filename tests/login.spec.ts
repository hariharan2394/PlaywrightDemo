import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login functionality', () => {
    let loginPage: LoginPage;

    test('should login successfully with valid credentials', async ({ page }) => {
        loginPage = new LoginPage(page);

        // Credentials 
        const username = 'Admin';
        const password = 'admin123';

        await loginPage.navigateTo('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Wait for basic DOM to be ready
        await page.waitForLoadState('domcontentloaded');

        // Verify we are on the login page
        await expect(page).toHaveURL(/.*login/);

        await loginPage.login(username, password);

        // Verify successful login by checking URL
        await expect(page).toHaveURL(/.*dashboard/);

        // Check for dashboard heading
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 30000 });
    });
});
