export interface BudgetRecommendations {
  rent: number;
  transport: number;
  food: number;
  services: number;
  health: number;
  savings: number;
  investments: number;
  debtPayment: number;
  entertainment: number;
}
export interface BudgetState {
  taxRate: number;
  yearlySalaryGross: number;
  yearlySalaryAT: number;
  monthlySalaryGross: number;
  monthlySalaryAT: number;
  recommendation: BudgetRecommendations;
  budgetBalance: number;
  totalExpenses: number;
}