import { Page } from "@playwright/test";

class DashboardPage {
  private page: Page;
  public createJobButton;
  public vacancyTable;
  public totalVacancies;
  public nextPageButton;
  public previousPageButton;
  public pageNumberButtons;

  constructor(page: Page) {
    this.page = page;
    this.createJobButton = page.locator(".create-job-btn");
    this.vacancyTable = page.locator(".vacancy-table");
    this.totalVacancies = page.locator(".total-vacancies h2");
    this.nextPageButton = page.locator(".pagination-button:has-text('Next')");
    this.previousPageButton = page.locator(".pagination-button:has-text('Previous')");
    this.pageNumberButtons = page.locator(".pagination-button");
  }

  async navigateToCreateJob() {
    await this.createJobButton.click();
  }

  async getVacancies() {
    const rows = await this.vacancyTable.locator("tbody tr").count();
    const vacancies = [];
    for (let i = 0; i < rows; i++) {
      const title = await this.vacancyTable.locator(`tbody tr:nth-child(${i + 1}) td:nth-child(1)`).textContent();
      const status = await this.vacancyTable.locator(`tbody tr:nth-child(${i + 1}) td:nth-child(2)`).textContent();
      const date = await this.vacancyTable.locator(`tbody tr:nth-child(${i + 1}) td:nth-child(3)`).textContent();
      vacancies.push({ title, status, date });
    }
    return vacancies;
  }

  async getTotalVacancies() {
    return await this.totalVacancies.textContent();
  }

  async goToNextPage() {
    await this.nextPageButton.click();
  }

  async goToPreviousPage() {
    await this.previousPageButton.click();
  }

  async goToPage(pageNumber: number) {
    await this.pageNumberButtons.locator(`:has-text('${pageNumber}')`).click();
  }
}

export { DashboardPage };