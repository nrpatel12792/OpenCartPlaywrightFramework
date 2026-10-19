import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    //1. private locator
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPassword: Locator;
    private readonly logo: Locator;
    private readonly loginErrorMsg : Locator;
    private readonly myAccountLink : Locator;
    private readonly registerLink : Locator;

    //2. initialize all the locators within the constructor after calling super(page) parent class BasePage Const...
    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address', exact: true });
        this.password = page.getByRole('textbox', { name: 'Password', exact: true });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPassword = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.logo = page.getByAltText('naveenopencart');
        this.loginErrorMsg = page.locator('//div[contains(@class,"alert-dismissible")]');
        this.myAccountLink = page.getByTitle('My Account');
        this.registerLink = page.getByRole('link', { name: 'Register' }).first();
    }

    //3. page actions
    async goToLoginPage() : Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async getLoginPageTitle() : Promise<string>{
        return await this.page.title();
    }

    async isForgotPasswordLinkExist() : Promise<boolean>{
        return await this.forgottenPassword.isVisible();
    }

    async doLogin(username:string, password : string) : Promise<void>{
        //console.log(`Username is : ${username} and Password is : ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async isErrorMessageDisplayed(): Promise<boolean>{
        return await this.loginErrorMsg.isVisible();
    }

    async navigateToRegisterPage(): Promise<void>{
        await this.myAccountLink.click();
        await this.registerLink.click();
    }
}