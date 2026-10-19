import { test as basetest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvHelper } from '../utils/CsvHelper';
import { RegisterPage } from '../pages/RegisterPage';

//define type for page fixtures
type pageFixtures = {
    loginPage: LoginPage,
    homePage: HomePage,
    registerPage : RegisterPage,
    testData : Record<string, string>[]
}

export let test = basetest.extend<pageFixtures>({

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage)
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    registerPage : async({page}, use) =>{
        let registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    testData: async ({  }, use) => {
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }
});

export { expect } from '@playwright/test';