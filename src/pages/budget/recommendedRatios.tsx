import { Recommendations } from './budgetInterfaces';
const RecommendedRatiosInitial : Recommendations = {
  rent: 0,
  transport: 0,
  food: 0,
  services: 0,
  health: 0,
  entertainment: 0,
  debtPayment: 0,
  savings: 0,
  investments: 0,
};
const RecommendedRatios:Recommendations = {
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
export {RecommendedRatios, RecommendedRatiosInitial};