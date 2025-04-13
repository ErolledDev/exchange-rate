export function initializeFeatures() {
  const featuresContainer = document.getElementById('features-container');
  
  featuresContainer.innerHTML = `
    <section class="features">
      <div class="features-grid">
        <div class="feature-card">
          <h3>Real-Time Rates</h3>
          <p>Get up-to-the-minute exchange rates for all major world currencies</p>
        </div>
        
        <div class="feature-card">
          <h3>Historical Data</h3>
          <p>Track currency trends with our comprehensive historical data</p>
        </div>
        
        <div class="feature-card">
          <h3>Multiple Currencies</h3>
          <p>Support for over 30 major world currencies</p>
        </div>
        
        <div class="feature-card">
          <h3>Fast & Reliable</h3>
          <p>Quick conversions with reliable, accurate exchange rates</p>
        </div>
      </div>
    </section>
  `;
}