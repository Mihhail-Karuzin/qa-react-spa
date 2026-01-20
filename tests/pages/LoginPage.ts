import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  usernameInput = () => this.page.getByTestId("username-input");
  passwordInput = () => this.page.getByTestId("password-input");
  loginButton = () => this.page.getByTestId("login-button");
  error = () => this.page.getByTestId("login-error");
  title = () => this.page.getByTestId("app-title");

  async goto() {
    await this.page.goto("/");
    await expect(this.title()).toBeVisible();
    await expect(this.page.getByTestId("login-page")).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }
}
