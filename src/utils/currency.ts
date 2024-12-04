export type CurrencyCode = 'INR' | 'USD';

export interface CurrencyFormat {
  symbol: string;
  code: CurrencyCode;
  decimals: number;
  placement: 'prefix' | 'suffix';
}

export const CURRENCY_FORMATS: Record<CurrencyCode, CurrencyFormat> = {
  INR: {
    symbol: '₹',
    code: 'INR',
    decimals: 2,
    placement: 'prefix'
  },
  USD: {
    symbol: '$',
    code: 'USD',
    decimals: 2,
    placement: 'prefix'
  }
};

export const formatCurrency = (
  amount: number,
  currency: CurrencyCode = 'INR'
): string => {
  const format = CURRENCY_FORMATS[currency];
  const formattedAmount = Math.abs(amount).toLocaleString('en-IN', {
    minimumFractionDigits: format.decimals,
    maximumFractionDigits: format.decimals
  });

  return format.placement === 'prefix'
    ? `${format.symbol}${formattedAmount}`
    : `${formattedAmount}${format.symbol}`;
};