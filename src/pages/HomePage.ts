import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    //1. private locator
    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    private readonly searchTextBox: Locator;
    private readonly searchBtn: Locator;


    //2. initialize all the locators within the constructor
    constructor(page: Page) {
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true });
        this.headers = page.getByRole('heading', { level: 2 });
        this.searchTextBox = page.getByRole('textbox', { name: 'Search' });
        this.searchBtn = page.getByRole('button', { name: '' });
    }

    //3. page actions 
    async getHomePageTitle(): Promise<string> {
        return await this.page.title();
    }

    async isLogoutLinkExist(): Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeadersCount(): Promise<number> {
        return await this.headers.count();
    }

    async getHomePageHeadersText(): Promise<string[]> {
        return await this.headers.allInnerTexts();
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchTextBox.fill(productName);
        await this.searchBtn.click();
    }
}