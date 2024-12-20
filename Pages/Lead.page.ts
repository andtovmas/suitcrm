import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class LeadPage extends BasePage {
  // Selectors
  public readonly firstName: Locator;
  public readonly lastName: Locator;
  public readonly searchNameBasic: Locator;
  public readonly getPhoneWork: Locator;
  public readonly searchTabHandler: Locator;

  constructor(page: Page) {
    super(page);

    // Define the selectors for the login page elements
    this.firstName = page.locator("#first_name");
    this.lastName = page.locator("#last_name");
    this.searchNameBasic = page.locator("#search_name_basic");
    this.getPhoneWork = page.locator("#phone_work");
    this.searchTabHandler = page.locator(".searchTabHandler");
  }

  NAMES = {
    createLead: " Create Lead",
    viewLeads: "View Leads",
    leads: "Leads",
  };
}
