import { format } from 'date-fns';

const BASE_URL = 'https://api.frankfurter.dev/v1';

export async function fetchExchangeRates(baseCurrency = 'USD') {
  const response = await fetch(`${BASE_URL}/latest?base=${baseCurrency}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.status}`);
  }
  
  const data = await response.json();
  return {
    base: data.base,
    date: data.date,
    rates: data.rates
  };
}

export async function fetchHistoricalRates(baseCurrency = 'USD', days = 90) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');

  const response = await fetch(
    `${BASE_URL}/${formattedStartDate}..${formattedEndDate}?base=${baseCurrency}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch historical rates: ${response.status}`);
  }

  const data = await response.json();
  const result = [];
  const dates = Object.keys(data.rates).sort().reverse();

  for (const date of dates) {
    result.push({
      date: date,
      rates: data.rates[date]
    });
  }

  return result;
}

export async function fetchAvailableCurrencies() {
  const response = await fetch(`${BASE_URL}/currencies`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch currencies: ${response.status}`);
  }
  
  return response.json();
}

export function convertCurrency(amount, fromRate, toRate) {
  if (typeof amount !== 'number' || isNaN(amount)) return 0;
  if (typeof fromRate !== 'number' || typeof toRate !== 'number') return 0;
  if (fromRate <= 0 || toRate <= 0) return 0;
  
  return (amount / fromRate) * toRate;
}