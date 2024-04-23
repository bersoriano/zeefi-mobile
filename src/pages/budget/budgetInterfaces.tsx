export interface BudgetContextValue {
  yearlyCompBT: number;
  yearlyCompAT: number;
  monthlySalaryAT: number;
  recommendation: Recommendations;
  totalExpenses: number;
  totalSavings: number;
  handleTotalCompChange: (event: any) => void;
  handleCustomInput: (event: any, input:any) => void,  
}
export interface Recommendations {
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
