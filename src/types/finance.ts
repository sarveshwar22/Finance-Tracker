export type CurrencyCode = 'INR' | 'USD';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  account: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'fd' | 'ppf';
  balance: number;
  currency: CurrencyCode;
}

export interface FinancialHealth {
  score: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}