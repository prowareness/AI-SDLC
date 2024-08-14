import { Page } from "@playwright/test";

class DashboardPage {
  private page: Page;
  private createJobButton;
  private vacancyTable;
  private totalVacancies;

  constructor(page: Page) {
    this.page = page;
    this.createJobButton = page.locator(".create-job-btn");
    this.vacancyTable = page.locator(".vacancy-table");
    this.totalVacancies = page.locator(".total-vacancies h2");
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
}

export { DashboardPage };