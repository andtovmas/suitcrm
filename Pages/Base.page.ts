import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;

  // Selectors
  public readonly saveButton: Locator;
  public readonly searchFormSubmit: Locator;
  public readonly glyphiconFilter: Locator;
  public readonly oddListRow: Locator;
  public readonly searchAppliedAlert: Locator;
  public readonly getGrouptab: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define the selectors for the login page elements
    this.saveButton = page.locator("#SAVE");
    this.searchFormSubmit = page.locator("#search_form_submit");
    this.glyphiconFilter = page.locator(".glyphicon-filter");
    this.oddListRow = page.locator(".oddListRowS1");
    this.searchAppliedAlert = page.locator(".searchAppliedAlert");
    this.getGrouptab = page.locator("#grouptab_1");
  }
}
