import React from 'react';
import { BarChart3, Wallet, TrendingUp, PieChart } from 'lucide-react';
import type { FinancialHealth } from '../../types/finance';
import { formatCurrency } from '../../utils/currency';

interface Props {
  financialHealth: FinancialHealth;
}

export const FinancialOverview: React.FC<Props> = ({ financialHealth }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Financial Health Score</p>
            <h3 className="text-2xl font-bold mt-2">{financialHealth.score}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-sm mt-2 ${
              financialHealth.status === 'excellent' ? 'bg-green-100 text-green-800' :
              financialHealth.status === 'good' ? 'bg-blue-100 text-blue-800' :
              financialHealth.status === 'fair' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {financialHealth.status.charAt(0).toUpperCase() + financialHealth.status.slice(1)}
            </span>
          </div>
          <BarChart3 className="w-12 h-12 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Monthly Income</p>
            <h3 className="text-2xl font-bold mt-2">
              {formatCurrency(financialHealth.monthlyIncome)}
            </h3>
          </div>
          <Wallet className="w-12 h-12 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Monthly Expenses</p>
            <h3 className="text-2xl font-bold mt-2">
              {formatCurrency(financialHealth.monthlyExpenses)}
            </h3>
          </div>
          <PieChart className="w-12 h-12 text-red-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Savings Rate</p>
            <h3 className="text-2xl font-bold mt-2">
              {financialHealth.savingsRate.toFixed(1)}%
            </h3>
          </div>
          <TrendingUp className="w-12 h-12 text-purple-500" />
        </div>
      </div>
    </div>
  );
};