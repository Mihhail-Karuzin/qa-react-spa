import { test, expect } from './fixtures';
import { LoginPage } from './pages/LoginPage';

test('login form has accessible inputs and button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();

  await expect(page.getByRole('textbox', { name: /username/i })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /password/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /login/i })).toBeEnabled();
});
