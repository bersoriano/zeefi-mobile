import React, { useState, useEffect } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import styles from "./budget.module.css";
import { BudgetState } from './budgetInterfaces';
import { BudgetInitial, BudgetRecommendedRatiosAvg } from './budgetInitial';
import USAStatesIncomeTaxRates_Single_90k from './USAIncomeStateTax'
const BudgetPage: React.FC = () => {
  // const { name } = useParams<{ name: string }>();
  const defaultStateTax = { name: 'Default', abbreviation: 'DF', incomeTaxRate: { federal: 0.1340, fica: 0.0765, state: 0.00, local: 0.00 } }
  const [selectedState, setSelectedTaxstate] = useState("Select your state");
  const [budget, setBudget] = useState({
    ...BudgetInitial
  });

  useEffect(() => {
    const updatedBudget = executeCalculations();
    setBudget((prevState) => ({
      ...prevState,
      ...updatedBudget
    })); 
  },[selectedState])

  const executeCalculations = (): BudgetState => {
    const yearlySalaryGross = budget.yearlySalaryGross;
    const monthlySalaryAT = (yearlySalaryGross / 12) * (1 - budget.taxRate);
    const RecommendedAmounts = {
      rent: monthlySalaryAT * BudgetRecommendedRatiosAvg.rent,
      transport: monthlySalaryAT * BudgetRecommendedRatiosAvg.transport,
      food: monthlySalaryAT * BudgetRecommendedRatiosAvg.food,
      services: monthlySalaryAT * BudgetRecommendedRatiosAvg.services,
      health: monthlySalaryAT * BudgetRecommendedRatiosAvg.health,
      entertainment: monthlySalaryAT * BudgetRecommendedRatiosAvg.entertainment,
      debtPayment: monthlySalaryAT * BudgetRecommendedRatiosAvg.debtPayment,
      savings: monthlySalaryAT * BudgetRecommendedRatiosAvg.savings,
      investments: monthlySalaryAT * BudgetRecommendedRatiosAvg.savings,
    };
    const totalExpenses = Object.values(RecommendedAmounts).reduce(
      (acc, value) => acc + value, 0);
    const totalSavings = monthlySalaryAT - totalExpenses;               
    return  {
      ...budget,
      yearlySalaryGross,
      yearlySalaryAT: yearlySalaryGross * (1 - budget.taxRate),
      monthlySalaryGross: yearlySalaryGross / 12,
      monthlySalaryAT,
      recommendation: {...RecommendedAmounts, savings: totalSavings/2, investments: totalSavings/2},
      budgetBalance: totalSavings,
      totalExpenses
    }    
  }

  const updateBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget((prevState) => ({
      ...prevState,
      yearlySalaryGross: parseFloat(event.target.value)
    }));
  }
  const updateIncomeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTaxState = USAStatesIncomeTaxRates_Single_90k.find(obj => obj.name === event.target.value) || defaultStateTax ;
    const totalStateIncomeTax = Object.values(selectedTaxState.incomeTaxRate).reduce((acc,value)=> acc + value, 0);
    setBudget((prevState) => ({
      ...prevState,
      taxRate: totalStateIncomeTax
    }));
    setSelectedTaxstate(selectedTaxState.name);
  }
  useEffect(() => console.log("Updated budget; ", budget));
  return (
    <IonPage>
      {/* <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader> */}
      <IonContent fullscreen>
        <main>
          <header className={styles.header}>
            <h1>My Budget</h1>
          </header>
          <section className={styles.main}>
            <IonLabel className={styles.label} mode="ios">
              💵 Anual salary. before taxes per year.
            </IonLabel>
            <div className={`${styles.flexRow} ${styles.textInput} `}>
              <IonItem>
                <IonInput
                  name = "budget-yearlySalaryGross"
                  value = {budget.yearlySalaryGross}
                  onIonChange={(event) => {updateBudget(event);}}
                  placeholder="Annual pay before taxes"
                  type="number"
                  label="$"
                  inputMode="decimal">
                </IonInput>
              </IonItem>
              <span className={styles.inputDetail}>USD</span>
            </div>
            <IonLabel className={styles.label} mode="ios">
              💵 Choose your state to calculate your tax.
            </IonLabel>
            <div className={`${styles.flexRow} ${styles.textInput} `}>
              <IonItem>
                <IonSelect
                  mode="ios"
                  onIonChange = {(event) => {updateIncomeState(event)}}
                  className={styles.dropDown}
                  placeholder="Select a State" value={selectedState}>
                  {USAStatesIncomeTaxRates_Single_90k.map((state: {name: string,abbreviation: string }) => (
                    <IonSelectOption key={state.name} value={state.name}>
                      {state.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <span className={styles.inputDetail}>State</span>
            </div>
            <section
              className={`${styles.flexColumn} ${styles.textAmountDescription} `}
            >
              <span>Approximate Monthly Salary After Taxes</span>
              <span className={styles.amount}>
                $ {budget.monthlySalaryAT.toLocaleString("en-US")}
              </span>
              <div className={styles.textBoxInfo}>
                <span>
                  ⬆️ We will be working with this amount for your budgeting. ⬇️
                </span>
              </div>
            </section>
            <section className={`${styles.flexColumn}`}>
              <IonLabel color="primary" className={styles.label} mode="ios">
                Budget Recommendations:
              </IonLabel>
              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  🏡 Rent/Mortgage
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      readonly
                      name="budget-recommendation-rent"
                      value={parseFloat(budget.recommendation.rent.toString()).toFixed(2)}
                      type="number"
                      label="$"
                      inputMode="decimal"
                    ></IonInput>
                  </IonItem>
                  <span className={styles.inputDetail}>Monthly</span>
                </div>
              </div>

              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  🚙 Car Payments/Transportation
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      readonly
                      name="budget-recommendation-transport"
                      value={parseFloat(
                        budget.recommendation.transport.toString()).toFixed(2)}
                      type="number"
                      label="$"
                      inputMode="decimal"
                    ></IonInput>
                  </IonItem>
                  <span className={styles.inputDetail}>Monthly</span>
                </div>
              </div>
              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  🥗 Food
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      readonly
                      name="budget-recommendation-food"
                      value={parseFloat(budget.recommendation.food.toString()).toFixed(2)}
                      type="number"
                      label="$"
                      inputMode="decimal"
                    ></IonInput>
                  </IonItem>
                  <span className={styles.inputDetail}>Monthly</span>
                </div>
              </div>
              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  ⚡️ Services
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      readonly
                      name="budget-recommendation-services"
                      value={parseFloat(
                        budget.recommendation.services.toString()
                      ).toFixed(2)}
                      type="number"
                      label="$"
                      inputMode="decimal"
                    ></IonInput>
                  </IonItem>
                  <span className={styles.inputDetail}>Monthly</span>
                </div>
              </div>
              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  🏥 Healthcare
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      readonly
                      name="budget-recommendation-health"
                      value={parseFloat(
                        budget.recommendation.health.toString()
                      ).toFixed(2)}
                      type="number"
                      label="$"
                      inputMode="decimal"
                    ></IonInput>
                  </IonItem>
                  <span className={styles.inputDetail}>Monthly</span>
                </div>
              </div>
              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  🏦 Debt Payment
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      readonly
                      name="budget-recommendation-debtPayment"
                      // onIonChange={(event) => handleCustomInput(event, recommendation.debtPayment)}                    
                      value={parseFloat(
                        budget.recommendation.debtPayment.toString()
                      ).toFixed(2)}
                      type="number"
                      label="$"
                      inputMode="decimal"
                    ></IonInput>
                  </IonItem>
                  <span className={styles.inputDetail}>Monthly</span>
                </div>
              </div>
              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  🛫 Travel/fun
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      readonly
                      name="budget-recommendation-entertainment"
                      value={parseFloat(
                        budget.recommendation.entertainment.toString()
                      ).toFixed(2)}
                      type="number"
                      label="$"
                      inputMode="decimal"
                    ></IonInput>
                  </IonItem>
                  <span className={styles.inputDetail}>Monthly</span>
                </div>
              </div>
            </section>
            <section
              className={`${styles.flexColumn} ${styles.textAmountDescription} `}
            >
              <span>Your Expenses:</span>
              <span className={styles.amount}>
                $ {budget.totalExpenses.toLocaleString("en-US")}
              </span>
              <div className={styles.textBoxInfo}>
                <span>
                  This represents 45.5% of your monthly income after taxes.
                </span>
                <span>
                  For a more personalized recommendation create a financial
                  profile.
                </span>
              </div>
            </section>
            <section
              className={`${styles.flexColumn} ${styles.textAmountDescription} `}
            >
              <span>Your Savings:</span>
              <span className={styles.amount}>
                $ {budget.budgetBalance.toLocaleString("en-US")}
              </span>
              <div className={styles.textBoxInfo}>
                <span>
                  This represents 45.5% of your monthly income after taxes.
                </span>
                <span>
                  For a more personalized recommendation create a financial
                  profile.
                </span>
              </div>
            </section>
            <section className={`${styles.flexColumn}`}>
              <IonLabel color="primary" className={styles.label} mode="ios">
                Savings & Investment Recommendations:
              </IonLabel>
              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  💰 Savings
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      name="budget-recommendation-savings"
                      value={parseFloat(
                        budget.recommendation.savings.toString()
                      ).toFixed(2)}
                      type="number"
                      label="$"
                      inputMode="decimal"
                    ></IonInput>
                  </IonItem>
                  <span className={styles.inputDetail}>Monthly</span>
                </div>
              </div>
              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  📈 Investments
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      name="budget-recommendation-investments"
                      value={parseFloat(
                        budget.recommendation.investments.toString()
                      ).toFixed(2)}
                      type="number"
                      label="$"
                      inputMode="decimal"
                    ></IonInput>
                  </IonItem>
                  <span className={styles.inputDetail}>Monthly</span>
                </div>
              </div>
            </section>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default BudgetPage;
