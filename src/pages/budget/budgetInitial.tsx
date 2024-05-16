import { BudgetRecommendations, BudgetState } from './budgetInterfaces';
const BudgetRecommendedRatiosAvg:BudgetRecommendations = {
  rent: 0.3,
  transport: 0.1,
  food: 0.15,
  services: 0.03,
  health: 0.07,
  entertainment: 0.05,  
  debtPayment: 0.1,
  savings: 0,
  investments: 0,
};
const BudgetInitial: BudgetState = {
  taxRate: .3,
  yearlySalaryGross: 0,
  yearlySalaryAT: 0,
  monthlySalaryGross: 0,
  monthlySalaryAT: 0,
  totalExpenses: 0,
  budgetBalance: 0,
  recommendation: {
    ...BudgetRecommendedRatiosAvg,
  }
}
export {BudgetRecommendedRatiosAvg, BudgetInitial};