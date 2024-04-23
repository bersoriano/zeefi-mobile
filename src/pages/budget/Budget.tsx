import React, { useState } from "react";
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
import usaStates from "./usaStates";
import styles from "./budget.module.css";
import { useBudgetContext } from "./BudgetProvider";
const BudgetPage: React.FC = () => {
  // const { name } = useParams<{ name: string }>();
  const [selectedState, setSelectedstate] = useState("Select your state");
  const {
    yearlyCompBT,
    yearlyCompAT,
    monthlySalaryAT,
    handleTotalCompChange,
    handleCustomInput,
    recommendation,
    totalExpenses,
    totalSavings,
  } = useBudgetContext();

  const handleStateChange = (event: any) => {
    const selectedState = event.target.value;
    setSelectedstate(selectedState);
  };

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
              💵 Total comp. before taxes per year.
            </IonLabel>
            <div className={`${styles.flexRow} ${styles.textInput} `}>
              <IonItem>
                <IonInput
                  value={yearlyCompBT}
                  onIonChange={(event) => handleTotalCompChange(event)}
                  placeholder="Annual pay before taxes"
                  type="number"
                  label="$"
                  inputMode="decimal"
                ></IonInput>
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
                  className={styles.dropDown}
                  placeholder="Your state"
                  onIonChange={(event) => handleStateChange(event)}
                  value={selectedState}
                >
                  {usaStates.map((state) => (
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
                $ {monthlySalaryAT.toLocaleString("en-US")}
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
                      value={parseFloat(recommendation.rent.toString()).toFixed(
                        2
                      )}
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
                      value={parseFloat(
                        recommendation.transport.toString()
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
                  🥗 Food
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
                      value={parseFloat(recommendation.food.toString()).toFixed(2)}
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
                      value={parseFloat(
                        recommendation.services.toString()
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
                      value={parseFloat(
                        recommendation.health.toString()
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
                      onIonChange={(event) => handleCustomInput(event, recommendation.debtPayment)}                    
                      value={parseFloat(
                        recommendation.debtPayment.toString()
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
                      value={parseFloat(
                        recommendation.entertainment.toString()
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
                $ {totalExpenses.toLocaleString("en-US")}
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
                $ {totalSavings.toLocaleString("en-US")}
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
                      value={parseFloat(
                        recommendation.savings.toString()
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
                      value={parseFloat(
                        recommendation.investments.toString()
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
