import React from 'react';
import { FinancialOverview } from './components/Dashboard/FinancialOverview';
import { AccountsList } from './components/Dashboard/AccountsList';
import { TransactionsList } from './components/Dashboard/TransactionsList';
import { calculateFinancialHealth } from './utils/financialCalculations';
import type { Account, Transaction } from './types/finance';

// Mock data for demonstration
const mockAccounts: Account[] = [
  { id: '1', name: 'Main Savings', type: 'savings', balance: 250000, currency: 'INR' },
  { id: '2', name: 'Fixed Deposit', type: 'fd', balance: 500000, currency: 'INR' },
  { id: '3', name: 'PPF Account', type: 'ppf', balance: 200000, currency: 'INR' },
  { id: '4', name: 'Investment Portfolio', type: 'investment', balance: 1000000, currency: 'INR' },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15',
    description: 'Salary Deposit',
    amount: 85000,
    category: 'Income',
    type: 'income',
    account: '1',
  },
  {
    id: '2',
    date: '2024-03-14',
    description: 'Grocery Shopping',
    amount: 5500,
    category: 'Food',
    type: 'expense',
    account: '1',
  },
  {
    id: '3',
    date: '2024-03-13',
    description: 'FD Interest',
    amount: 3500,
    category: 'Investment',
    type: 'income',
    account: '2',
  },
  {
    id: '4',
    date: '2024-03-12',
    description: 'Electricity Bill',
    amount: 2800,
    category: 'Utilities',
    type: 'expense',
    account: '1',
  },
];

function App() {
  const financialHealth = calculateFinancialHealth(mockTransactions, mockAccounts);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <FinancialOverview financialHealth={financialHealth} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <AccountsList accounts={mockAccounts} />
          <TransactionsList transactions={mockTransactions} />
        </div>
      </main>
    </div>
  );
}

export default App;