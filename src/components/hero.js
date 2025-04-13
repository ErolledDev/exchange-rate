import { fetchExchangeRates, convertCurrency } from '../api/exchangeApi.js';
import { updateUrlParams } from '../utils/urlHandler.js';
import { format } from 'date-fns';

export function initializeHero() {
  const heroContainer = document.getElementById('hero-container');
  
  heroContainer.innerHTML = `
    <section class="hero">
      <div class="hero-content">
        <h1>Real-Time Currency Converter</h1>
        <p>Convert currencies with live exchange rates</p>
        
        <div class="converter-card">
          <div class="last-update"></div>
          <div class="converter-form">
            <div class="input-group">
              <input type="number" id="amount" value="1" min="0" step="any">
              <select id="fromCurrency">
                <option value="USD">USD</option>
              </select>
            </div>
            
            <button id="swap-currencies" class="swap-btn">⇄</button>
            
            <div class="input-group">
              <input type="number" id="result" readonly>
              <select id="toCurrency">
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          
          <button id="convert" class="convert-btn">Convert</button>
          <p id="rate-info" class="rate-info"></p>
        </div>
      </div>
    </section>
  `;

  initializeConverter();
}

async function initializeConverter() {
  const amount = document.getElementById('amount');
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');
  const result = document.getElementById('result');
  const rateInfo = document.getElementById('rate-info');
  const swapButton = document.getElementById('swap-currencies');
  const convertButton = document.getElementById('convert');
  const lastUpdate = document.querySelector('.last-update');

  try {
    // Initial fetch to get available currencies
    const initialRates = await fetchExchangeRates();
    
    if (!initialRates || !initialRates.rates || typeof initialRates.rates !== 'object') {
      throw new Error('Invalid exchange rates data');
    }

    // Clear and populate currency dropdowns
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';
    
    Object.keys(initialRates.rates).forEach(currency => {
      fromCurrency.add(new Option(currency, currency));
      toCurrency.add(new Option(currency, currency));
    });
    
    // Add base currency since it's not in the rates
    fromCurrency.add(new Option(initialRates.base, initialRates.base));
    toCurrency.add(new Option(initialRates.base, initialRates.base));

    // Set default values
    fromCurrency.value = initialRates.base;
    toCurrency.value = Object.keys(initialRates.rates)[0];

    async function performConversion() {
      try {
        const currentRates = await fetchExchangeRates(fromCurrency.value);
        
        if (!currentRates || !currentRates.rates || typeof currentRates.rates !== 'object') {
          throw new Error('Invalid exchange rates data');
        }

        const toRate = currentRates.rates[toCurrency.value];
        
        if (toRate === undefined && toCurrency.value !== currentRates.base) {
          throw new Error(`Exchange rate not available for ${toCurrency.value}`);
        }

        const convertedAmount = convertCurrency(
          parseFloat(amount.value) || 0,
          1, // Base currency rate is always 1
          toCurrency.value === currentRates.base ? 1 : toRate
        );
        
        result.value = convertedAmount.toFixed(2);
        rateInfo.textContent = `1 ${fromCurrency.value} = ${(toCurrency.value === currentRates.base ? 1 : toRate).toFixed(4)} ${toCurrency.value}`;
        lastUpdate.textContent = `Last updated: ${format(new Date(currentRates.date), 'PPP')}`;
        
        updateUrlParams({
          amount: amount.value,
          from: fromCurrency.value,
          to: toCurrency.value
        });
      } catch (error) {
        console.error('Conversion error:', error);
        rateInfo.textContent = error.message || 'Error performing conversion. Please try again.';
        result.value = '';
        lastUpdate.textContent = '';
      }
    }

    // Event listeners
    convertButton.addEventListener('click', performConversion);
    amount.addEventListener('input', performConversion);
    fromCurrency.addEventListener('change', performConversion);
    toCurrency.addEventListener('change', performConversion);
    
    swapButton.addEventListener('click', () => {
      const temp = fromCurrency.value;
      fromCurrency.value = toCurrency.value;
      toCurrency.value = temp;
      performConversion();
    });

    // Initial conversion
    await performConversion();
  } catch (error) {
    console.error('Initialization error:', error);
    rateInfo.textContent = error.message || 'Error loading exchange rates. Please refresh the page.';
    lastUpdate.textContent = '';
  }
}