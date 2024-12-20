import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class AccountsPage extends BasePage {
  // Selectors
  public readonly accountName: Locator;
  public readonly nameBasic: Locator;
  public readonly getPhoneOffice: Locator;
  public readonly actionMenuCaret: Locator;

  constructor(page: Page) {
    super(page);

    // Define the selectors for the login page elements
    this.accountName = page.locator("#name");
    this.nameBasic = page.locator("#name_basic");
    this.getPhoneOffice = page.locator("#phone_office");
    this.actionMenuCaret = page
      .locator(".fancymenu")
      .locator(".suitepicon-action-caret");
  }

  NAMES = {
    createAccounts: "Create Account",
    viewAccounts: "View Accounts",
    accounts: "Accounts",
    selectAll: "Select all",
    select: "Select",
    search: "Search",
  };
}
