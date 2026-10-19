import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
    private readonly searchCriteriaTextBox: Locator;
    private readonly allCategoryDropdown: Locator;
    private readonly subcategoryCheckbox: Locator;
    private readonly prodDespCheckbox: Locator;
    private readonly searchBtn: Locator;
    private readonly noProductMatchLabel: Locator;
    private readonly productCount: Locator;

    constructor(page: Page) {
        super(page);
        this.searchCriteriaTextBox = page.getByRole('textbox', { name: 'Search Criteria' });
        this.allCategoryDropdown = page.locator("select[name = 'category_id']");
        this.subcategoryCheckbox = page.getByRole('checkbox', { name: 'Search in subcategories' });
        this.prodDespCheckbox = page.getByRole('checkbox', { name: 'Search in product descriptions' });
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.noProductMatchLabel = page.locator('#content').locator("p").last();
        this.productCount = page.locator("//div[@id='content']//div[contains(@class,'product-layout')]");
    }

    async searchProductCount(): Promise<number> {
        return await this.productCount.count();
    }
}