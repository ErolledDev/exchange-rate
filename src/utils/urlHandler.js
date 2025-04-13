export function initializeUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Set initial values from URL if they exist
  if (urlParams.has('amount')) {
    document.getElementById('amount').value = urlParams.get('amount');
  }
  if (urlParams.has('from')) {
    document.getElementById('fromCurrency').value = urlParams.get('from');
  }
  if (urlParams.has('to')) {
    document.getElementById('toCurrency').value = urlParams.get('to');
  }
}

export function updateUrlParams({ amount, from, to }) {
  const url = new URL(window.location);
  url.searchParams.set('amount', amount);
  url.searchParams.set('from', from);
  url.searchParams.set('to', to);
  window.history.pushState({}, '', url);
}