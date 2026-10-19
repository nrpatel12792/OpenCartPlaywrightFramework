import { test, expect } from '../src/fixtures/PageFixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.navigateToRegisterPage();
})

test("Register User Test", async ({ registerPage }) => {
    let randomNumber: number = Date.now();
    let isCreated: boolean = await registerPage.registerUser("FN" + randomNumber, "LN" + randomNumber, Date.now() + "@yahoo.ca", "9031234567", randomNumber + "@123");
    expect(isCreated).toBeTruthy();
});

let registerUserData = CsvHelper.readCsv('src/data/registerUserData.csv');
for (let row of registerUserData) {
    test(`Register User Test by passing test data through CSV ${row.first}`, async ({ registerPage }) => {
        let isCreated: boolean = await registerPage.registerUser(row.first, row.last, row.email + Date.now(), row.telephone, row.password);
        expect(isCreated).toBeTruthy();
    });
}
