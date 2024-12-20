import { Browser, chromium, Page } from "@playwright/test";
import { LoginPage } from "./Pages/Login.page";

let loginPage:LoginPage

 export const ENV={
    user:process.env.USER,
    password:process.env.PASSWORD,
    globalUrl:process.env.GLOBAL_URL,

    

}
async function globalSetup() {

    const browser: Browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    if (await loginPage.isPasswordInputVisible() && await loginPage.isUsernameInputVisible()){
        await loginPage.login(`${ENV.user}`,`${ENV.password}`,page);
        await page.context().storageState({ path: "./loginAuth.json" });
    } else {
        console.log("User already authenticated. Skipping login.");
    }

}

export default globalSetup;
