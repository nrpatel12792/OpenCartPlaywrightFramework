import { test, expect } from '../src/fixtures/PageFixtures';

test.beforeEach(async ({ loginPage}) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
});

test('Home page title test', async ({ homePage }) => {
    let title: string = await homePage.getHomePageTitle();
    expect(title).toBe('My Account');
});

test('Logout link exists test', async ({ homePage }) => {
    let isExist: boolean = await homePage.isLogoutLinkExist();
    expect(isExist).toBeTruthy();
});

test('Total number of home page headers test', async ({ homePage }) => {
    let totalHeaders: number = await homePage.getHomePageHeadersCount();
    expect(totalHeaders).toEqual(4);
});

test('Get texts of all the home page headers test', async ({ homePage }) => {
    let headersText: string[] = await homePage.getHomePageHeadersText();
    console.log('Home Page Headers: ', headersText);
    expect.soft(headersText.length).toEqual(4);
    expect(headersText).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
});