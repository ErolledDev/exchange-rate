import { fetchExchangeRates, convertCurrency } from '../api/exchangeApi.js';
import { updateUrlParams } from '../utils/urlHandler.js';

export function initializeHero() {
  const heroContainer = document.getElementById('hero-container');
  
  heroContainer.innerHTML = `
    <section class="hero">
      <div class="hero-content">
        <h1>Real-Time Currency Converter</h1>
        <p>Convert currencies with live exchange rates</p>
        
        <div class="converter-card">
          <div class="converter-form">
            <div class="input-group">
              <input type="number" id="amount" value="1" min="0" step="any">
              <select id="fromCurrency">
                <option value="USD">USD</option>
                <!-- Other options will be populated dynamically -->
              </select>
            </div>
            
            <button id="swap-currencies" class="swap-btn">⇄</button>
            
            <div class="input-group">
              <input type="number" id="result" readonly>
              <select id="toCurrency">
                <option value="EUR">EUR</option>
                <!-- Other options will be populated dynamically -->
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

  try {
    // Get exchange rates
    const rates = await fetchExchangeRates();
    
    // Clear existing options
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';
    
    // Ensure we have valid rates before proceeding
    if (!rates || typeof rates !== 'object') {
      throw new Error('Invalid exchange rates data');
    }

    // Add currency options
    Object.keys(rates).forEach(currency => {
      fromCurrency.add(new Option(currency, currency));
      toCurrency.add(new Option(currency, currency));
    });

    // Set default values
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';

    // Handle conversion
    async function performConversion() {
      try {
        const currentRates = await fetchExchangeRates();
        if (!currentRates || typeof currentRates !== 'object') {
          throw new Error('Invalid exchange rates data');
        }

        const fromRate = currentRates[fromCurrency.value] || 1;
        const toRate = currentRates[toCurrency.value] || 1;
        
        const convertedAmount = convertCurrency(
          parseFloat(amount.value) || 0,
          fromRate,
          toRate
        );
        
        result.value = convertedAmount.toFixed(2);
        rateInfo.textContent = `1 ${fromCurrency.value} = ${(toRate / fromRate).toFixed(4)} ${toCurrency.value}`;
        
        // Update URL parameters
        updateUrlParams({
          amount: amount.value,
          from: fromCurrency.value,
          to: toCurrency.value
        });
      } catch (error) {
        console.error('Conversion error:', error);
        rateInfo.textContent = 'Error performing conversion. Please try again.';
      }
    }

    // Event listeners
    convertButton.addEventListener('click', performConversion);
    swapButton.addEventListener('click', () => {
      const temp = fromCurrency.value;
      fromCurrency.value = toCurrency.value;
      toCurrency.value = temp;
      performConversion();
    });

    // Initial conversion
    performConversion();
  } catch (error) {
    console.error('Initialization error:', error);
    rateInfo.textContent = 'Error loading exchange rates. Please refresh the page.';
  }
}