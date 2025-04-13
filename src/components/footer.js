export function initializeFooter() {
  const footerContainer = document.getElementById('footer-container');
  
  footerContainer.innerHTML = `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Currency Exchange</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/historical-rates">Historical Rates</a></li>
            <li><a href="/currency-charts">Currency Charts</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/disclaimer">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Currency Exchange. All rights reserved.</p>
      </div>
    </footer>
  `;
}