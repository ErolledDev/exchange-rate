// Mock exchange rate data
const mockRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0
};

export async function fetchExchangeRates() {
  return mockRates;
}

export async function fetchHistoricalRates() {
  return {
    ...mockRates,
    timestamp: Date.now()
  };
}

export async function fetchAvailableCurrencies() {
  return Object.keys(mockRates);
}

export function convertCurrency(amount, fromRate, toRate) {
  return (amount / fromRate) * toRate;
}

export function getMockExchangeRates() {
  return mockRates;
}

export function getMockHistoricalRates() {
  return {
    ...mockRates,
    timestamp: Date.now()
  };
}