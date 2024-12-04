import React from 'react';
import { CreditCard, Landmark, PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import type { Account } from '../../types/finance';
import { formatCurrency } from '../../utils/currency';

interface Props {
  accounts: Account[];
}

const getAccountIcon = (type: Account['type']) => {
  switch (type) {
    case 'checking':
      return <Wallet className="w-6 h-6 text-blue-600" />;
    case 'savings':
      return <PiggyBank className="w-6 h-6 text-blue-600" />;
    case 'investment':
      return <TrendingUp className="w-6 h-6 text-blue-600" />;
    case 'fd':
      return <Landmark className="w-6 h-6 text-blue-600" />;
    case 'ppf':
      return <CreditCard className="w-6 h-6 text-blue-600" />;
    default:
      return <Wallet className="w-6 h-6 text-blue-600" />;
  }
};

export const AccountsList: React.FC<Props> = ({ accounts }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Accounts</h2>
      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                {getAccountIcon(account.type)}
              </div>
              <div>
                <h3 className="font-medium">{account.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{account.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {formatCurrency(account.balance, account.currency)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};