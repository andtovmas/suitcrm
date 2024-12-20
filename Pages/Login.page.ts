import { Page, Locator } from "@playwright/test";
import { ENV } from "../global.setup";

export class LoginPage {
  private page: Page;

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define the selectors for the login page elements
    this.usernameInput = page.locator("#user_name");
    this.passwordInput = page.locator("#username_password");
    this.loginButton = page.locator("#bigbutton");
  }

  async navigate() {
    await this.page.goto(`${ENV.globalUrl}`);
  }

  async login(user: string, password: string, page: Page) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(password);
    await page.waitForTimeout(3000);
    await this.loginButton.click();
  }
  async isUsernameInputVisible() {
    return (await this.usernameInput?.isVisible()) ?? false;
  }

  async isPasswordInputVisible() {
    return (await this.passwordInput?.isVisible()) ?? false;
  }
}
