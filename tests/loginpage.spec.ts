
import { test, expect } from '../src/fixtures/PageFixtures';
import dotenv from 'dotenv';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});

test('Login page title test', async ({ loginPage }) => {
    let title: string = await loginPage.getLoginPageTitle();
    expect(title).toBe("Account Login");
});

test('Forgot password link exists or not', async ({ loginPage }) => {
    let isExist: boolean = await loginPage.isForgotPasswordLinkExist();
    expect(isExist).toBeTruthy();
});

test('User is able to login with right credentials', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    expect(await homePage.getHomePageTitle()).toBe('My Account');
});

/**
 * Passing Data to test through Fixtures 
 * Disadvantages : Only 1 test is running for all the records in sequential order
 */
test('Fixtures : Try to login to application with wrong credentials from CSV file', async ({ loginPage, testData }) => {
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);  //username and password is per column name in .csv file
        expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    }
});

/**
 * Passing Data to test directly to test 
 * advantages : Runs test in parallel mode plus each record runs seperatly
 */
let testdata = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testdata) {
    test(`Without Fixtures : Try to login to application with wrong credentials from CSV file ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    })
}
