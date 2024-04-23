import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import BudgetProvider from "./pages/budget/BudgetProvider";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </React.StrictMode>
);