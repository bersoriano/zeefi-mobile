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
import ExploreContainer from "../../components/ExploreContainer";
import {
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import styles from "./budget.module.css";

const BudgetPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const usaStates = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
];

  const [totalComp, setTotalComp] = useState<number>(0.00);
  const [monthlyCompAfterTax, setMonthlyCompAfterTax] = useState<number>(0.00);
  const [selectedState, setSelectedstate] = useState("Select your state");
  const federalIncomeTaxBrackets = [
    { bracket: '.1', taxableIncome: { start: 0, end: 11600 } },
    { bracket: '.12', taxableIncome: { start: 11601, end: 47650 } },
    { bracket: '.22', taxableIncome: { start: 40526, end: 86375 } },
    { bracket: '.24', taxableIncome: { start: 86376, end: 164925 } },
    { bracket: '.32', taxableIncome: { start: 164926, end: 209425 } },
    { bracket: '.35', taxableIncome: { start: 209426, end: 523600 } },
    { bracket: '.37', taxableIncome: { start: 523601 } }
];
  const handleTotalCompChange = (event:any) => {
    const totalCompValue = event.target.value;
    setTotalComp(totalCompValue);
    setMonthlyCompAfterTax(calculateMonthlyComp(totalCompValue))
  };

  const handleStateChange = (event:any) => {
    const selectedState = event.target.value;
    setSelectedstate(selectedState);
  }

  const calculateMonthlyComp = (totalComp:number) => {
    return (totalComp/12)*.7;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

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
                  value={totalComp}
                  onIonChange={(event)=> handleTotalCompChange(event)}
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
                  onIonChange = {(event) => handleStateChange(event)}
                  value={selectedState}>
                  {usaStates.map((state)=> (
                    <IonSelectOption key={state.name} value={state.name}>{state.name}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <span className={styles.inputDetail}>State</span>
            </div>
            <section
              className={`${styles.flexColumn} ${styles.textAmountDescription} `}>
              <span>Approximate Monthly Salary After Taxes</span>
              <span className={styles.amount}>$ {monthlyCompAfterTax.toLocaleString('en-US')}</span>
              <span className={styles.textBoxInfo}>
                We will be working with this amount for your budgeting
              </span>
            </section>
            <section className={`${styles.flexColumn}`}>
              <IonLabel color="primary" className={styles.label} mode="ios">
                Budget Recommendations:
              </IonLabel>
              <div className={`${styles.flexColumn} ${styles.textInput} `}>
                <IonLabel className={styles.label} mode="ios">
                  🏡 Rent
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
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
                  🚙 Transportation
                </IonLabel>
                <div className={`${styles.flexRow} ${styles.textInput} `}>
                  <IonItem>
                    <IonInput
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
              <span>Approx. Monthly Salary A.T.</span>
              <span>$ 10,000.00 USD</span>
              <span className={styles.textBoxInfo}>
                We will be working with this amount for your budgeting
              </span>
            </section>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default BudgetPage;
