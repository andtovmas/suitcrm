import { LeadPage } from "./../Pages/Lead.page";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/Login.page";
import { generateRandomString } from "../utils/funtions";
import { AccountsPage } from "../Pages/Accounts.page";
import { LOCATORS } from "../utils/data";

const firstName = generateRandomString(5);
const accountName = generateRandomString(5);
const lastName = "Smith";
const phoneNumber = "1234567867";
test.describe("Clients", () => {
  let loginPage: LoginPage;
  let leadPage: LeadPage;
  let accountsPage: AccountsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    leadPage = new LeadPage(page);
    accountsPage = new AccountsPage(page);
    await loginPage.navigate();
    await page.setViewportSize({ width: 1900, height: 1000 });
  });
  test("Create New Lead", async ({ page }) => {
    await leadPage.getGrouptab.hover({ force: true });
    await page.getByRole("link", { name: leadPage.NAMES.leads }).click();
    await page.getByRole("link", { name: leadPage.NAMES.createLead }).click();
    await leadPage.firstName.fill(firstName);
    await leadPage.lastName.fill(lastName);
    await leadPage.getPhoneWork.fill(phoneNumber);
    await leadPage.saveButton.first().click();
    await page.getByRole("link", { name: leadPage.NAMES.viewLeads }).click();
    await leadPage.glyphiconFilter.first().click();
    await leadPage.searchTabHandler.first().click();
    await leadPage.searchNameBasic.fill(firstName);
    await leadPage.searchFormSubmit.click();
    await expect(leadPage.oddListRow).toContainText(firstName);
  });
  test("Create New Accounts", async ({ page }) => {
    await leadPage.getGrouptab.hover({ force: true });
    await page
      .getByRole("menu")
      .getByRole("link", { name: accountsPage.NAMES.accounts })
      .click();
    await page
      .getByRole("link", { name: accountsPage.NAMES.createAccounts })
      .click();
    await accountsPage.accountName.fill(accountName);
    await accountsPage.getPhoneOffice.fill(phoneNumber);
    await accountsPage.saveButton.first().click();
    await page
      .getByRole("link", { name: accountsPage.NAMES.viewAccounts })
      .click();
    await accountsPage.glyphiconFilter.first().click();
    await accountsPage.nameBasic.fill(accountName);
    await accountsPage.searchFormSubmit.click();
    await expect(accountsPage.oddListRow).toContainText(accountName);
  });

  test("Verify account with lead selection", async ({ page }) => {
    await leadPage.getGrouptab.hover({ force: true });
    await page
      .getByRole("menu")
      .getByRole("link", { name: accountsPage.NAMES.accounts })
      .click();
    await page
      .getByRole("link", { name: accountsPage.NAMES.viewAccounts })
      .click();
    await accountsPage.searchAppliedAlert.first().click();
    await accountsPage.glyphiconFilter.first().click();
    await accountsPage.nameBasic.fill(accountName);
    await accountsPage.searchFormSubmit.click();
    await expect(accountsPage.oddListRow).toContainText(accountName);
    await page
      .getByRole("link", { name: `${accountName}`, exact: true })
      .click();
    await page.getByRole("button", { name: leadPage.NAMES.leads }).click();
    await accountsPage.actionMenuCaret.click();

    // Wait for the new tab to open upon clicking the button
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      page.getByText(accountsPage.NAMES.select).first().click(),
    ]);
    await newPage.waitForLoadState("load");
    await newPage.locator(LOCATORS.firstNameAdvanced).fill(firstName);
    await newPage
      .getByRole("button", { name: accountsPage.NAMES.search })
      .click({ force: true });
    await newPage
      .locator("thead")
      .getByRole("checkbox", { name: accountsPage.NAMES.selectAll })
      .click({ force: true });
    await newPage
      .getByRole("button", { name: accountsPage.NAMES.select })
      .waitFor({ state: "visible" });
    await newPage
      .getByRole("button", { name: accountsPage.NAMES.select })
      .click({ force: true });

    // Close the new tab
    await newPage.close();

    // Return to the previous tab
    await page.bringToFront();
    await expect(accountsPage.oddListRow).toContainText(firstName);
  });
});
