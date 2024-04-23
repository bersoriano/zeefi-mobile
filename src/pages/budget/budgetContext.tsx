import {createContext} from 'react';
import {BudgetContextValue} from './budgetInterfaces';
import {RecommendedRatios} from './recommendedRatios'

const BudgetContext = createContext<BudgetContextValue>({
  yearlyCompBT: 0,
  yearlyCompAT: 0,
  monthlySalaryAT: 0,
  recommendation: {
    ...RecommendedRatios,
  },
  totalExpenses: 0,
  totalSavings: 0,
  handleTotalCompChange: (event: any) => {},
  handleCustomInput: (event: any, input: any) => {},
});

export default BudgetContext;