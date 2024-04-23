import React, { useState, createContext, useContext } from "react";
import {
  RecommendedRatios,
  RecommendedRatiosInitial,
} from "./recommendedRatios";
import { BudgetContextValue, Recommendations } from "./budgetInterfaces";
import BudgetContext from  './budgetContext';

export const useBudgetContext = () => useContext<BudgetContextValue>(BudgetContext);

function BudgetProvider({ children }: React.PropsWithChildren<{}>) {
  const [yearlyCompBT, setYearlyCompBT] = useState<number>(0);
  const [yearlyCompAT, setYearlyCompAT] = useState<number>(0);
  const [monthlySalaryAT, setMonthlySalaryAT] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<Recommendations>(
    RecommendedRatiosInitial
  );
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const updateYearlyCompBT = (yearlyCompBT: number) => {
    const taxRate = 0.3;
    const monthlySalaryBT = yearlyCompBT / 12;
    const monthlySalaryAT = monthlySalaryBT * (1 - taxRate);
    const RecommendedAmounts = {
      rent: monthlySalaryAT * RecommendedRatios.rent,
      transport: monthlySalaryAT * RecommendedRatios.transport,
      food: monthlySalaryAT * RecommendedRatios.food,
      services: monthlySalaryAT * RecommendedRatios.services,
      health: monthlySalaryAT * RecommendedRatios.health,
      entertainment: monthlySalaryAT * RecommendedRatios.entertainment,
      debtPayment: monthlySalaryAT * RecommendedRatios.debtPayment,
      savings: monthlySalaryAT * RecommendedRatios.savings,
      investments: monthlySalaryAT * RecommendedRatios.savings,
    };
    const totalExpenses = (Object.values(RecommendedAmounts).reduce((acc, value) => acc + value, 0));
    const totalSavings = monthlySalaryAT - totalExpenses;
    RecommendedAmounts.savings = totalSavings/2;
    RecommendedAmounts.investments = totalSavings/2;

    //RecommendedAmounts.debtPayment = 0;

    setYearlyCompBT(yearlyCompBT);
    setMonthlySalaryAT(monthlySalaryAT);
    setTotalExpenses(totalExpenses);
    setTotalSavings(totalSavings);
    setRecommendation({ ...RecommendedAmounts });
  };

  const handleTotalCompChange = (event: any) => {
    const totalCompValue = event.target.value;
    updateYearlyCompBT(totalCompValue);
  };

  const handleCustomInput = (event: any, el: any) => {
    debugger;
    const value = event.target.value;
  }

  const value: BudgetContextValue = {
    yearlyCompBT,
    yearlyCompAT,
    monthlySalaryAT,
    handleTotalCompChange,
    handleCustomInput,
    recommendation: {
      ...recommendation,
    },
    totalExpenses,
    totalSavings,
  };

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
}

export default BudgetProvider;
