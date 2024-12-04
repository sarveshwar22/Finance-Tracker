import type { Transaction, Account, FinancialHealth } from '../types/finance';

const getMonthlyTransactions = (transactions: Transaction[]): Transaction[] => {
  const currentDate = new Date();
  return transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentDate.getMonth() &&
           transactionDate.getFullYear() === currentDate.getFullYear();
  });
};

const calculateMonthlyIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

const calculateMonthlyExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

const calculateSavingsRate = (income: number, expenses: number): number => {
  if (income <= 0) return 0;
  const rate = ((income - expenses) / income) * 100;
  return Math.max(0, Math.min(100, rate)); // Clamp between 0 and 100
};

const calculateBalanceScore = (totalBalance: number, monthlyExpenses: number): number => {
  if (monthlyExpenses <= 0) return 40; // Max score if no expenses
  const score = (totalBalance / (monthlyExpenses * 6)) * 40;
  return Math.min(40, Math.max(0, score));
};

const calculateSavingsScore = (savingsRate: number): number => {
  const score = (savingsRate / 30) * 40;
  return Math.min(40, Math.max(0, score));
};

const calculateExpenseRatioScore = (monthlyIncome: number, monthlyExpenses: number): number => {
  if (monthlyIncome <= 0) return 0;
  const expenseRatio = monthlyExpenses / monthlyIncome;
  const score = (1 - expenseRatio) * 20;
  return Math.min(20, Math.max(0, score));
};

const calculateHealthScore = (
  totalBalance: number,
  savingsRate: number,
  monthlyIncome: number,
  monthlyExpenses: number
): number => {
  const balanceScore = calculateBalanceScore(totalBalance, monthlyExpenses);
  const savingsScore = calculateSavingsScore(savingsRate);
  const expenseRatioScore = calculateExpenseRatioScore(monthlyIncome, monthlyExpenses);
  
  return Math.round(balanceScore + savingsScore + expenseRatioScore);
};

const getHealthStatus = (score: number): FinancialHealth['status'] => {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
};

export const calculateFinancialHealth = (
  transactions: Transaction[],
  accounts: Account[]
): FinancialHealth => {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const monthlyTransactions = getMonthlyTransactions(transactions);
  const monthlyIncome = calculateMonthlyIncome(monthlyTransactions);
  const monthlyExpenses = calculateMonthlyExpenses(monthlyTransactions);
  const savingsRate = calculateSavingsRate(monthlyIncome, monthlyExpenses);
  const score = calculateHealthScore(totalBalance, savingsRate, monthlyIncome, monthlyExpenses);
  
  return {
    score,
    status: getHealthStatus(score),
    monthlyIncome,
    monthlyExpenses,
    savingsRate
  };
};