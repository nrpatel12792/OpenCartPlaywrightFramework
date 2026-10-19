import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {

    private readonly firstNameTextBox: Locator;
    private readonly lastNameTextBox: Locator;
    private readonly emailTextBox: Locator;
    private readonly telephoneTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly comfirmPasswordTextBox: Locator;
    private readonly subscribeYesRadioBtn: Locator;
    private readonly subscribeNoRadioBtn: Locator;
    private readonly privacyPolivyCheckBox: Locator;
    private readonly continueBtn: Locator;
    private readonly successMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameTextBox = page.getByRole('textbox', { name: '* First Name' });
        this.lastNameTextBox = page.getByRole('textbox', { name: '* Last Name' });
        this.emailTextBox = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephoneTextBox = page.getByRole('textbox', { name: '* Telephone' });
        this.passwordTextBox = page.getByRole('textbox', { name: '* Password', exact: true }).first();
        this.comfirmPasswordTextBox = page.getByRole('textbox', { name: '* Password Confirm', exact: true });
        this.subscribeNoRadioBtn = page.getByRole('radio', { name: 'No' });
        this.subscribeYesRadioBtn = page.getByRole('radio', { name: 'Yes' });
        this.privacyPolivyCheckBox = page.getByRole('checkbox');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.successMsg = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 });
    }

    async registerUser(firstName: string, lastName: string, email: string, telephone: string, password: string) : Promise<boolean>{
        await this.firstNameTextBox.fill(firstName);
        await this.lastNameTextBox.fill(lastName);
        await this.emailTextBox.fill(email);
        await this.telephoneTextBox.fill(telephone);
        await this.passwordTextBox.fill(password);
        await this.comfirmPasswordTextBox.fill(password);
        await this.subscribeNoRadioBtn.click();
        await this.privacyPolivyCheckBox.click();
        await this.continueBtn.click();
        return await this.successMsg.isVisible();
    }
}