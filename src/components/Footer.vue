<template>
  <footer class="footer">
    <!-- Banner do App com fundo claro (mesmo tom dos cards de hambúrguer) -->
    <div class="app-banner">
      <h3 class="app-title">Baixe nosso App e tenha o Burguer Zap na palma da sua mão!</h3>
      <div class="store-buttons">
        <a href="#" class="store-btn">
          <svg class="btn-icon" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-12 69.5-34.3z"/></svg>
          <span>App Store</span>
        </a>
        <a href="#" class="store-btn">
          <svg class="btn-icon" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3-60.1-60.1L104.6 499z"/></svg>
          <span>Google Play</span>
        </a>
      </div>
    </div>

    <!-- Navegação -->
    <div class="footer-links">
      <a href="#">Sobre o Burguer Zap</a>
      <a href="#">Trabalhe Conosco</a>
      <a href="#">Privacidade</a>
      <a href="#">Termos de Uso</a>
    </div>

    <!-- Redes Sociais com alto contraste -->
    <div class="social-section">
      <p class="social-title">Compartilhe algo delicioso</p>
      <div class="social-icons">
        <!-- Instagram -->
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <!-- Facebook -->
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <!-- WhatsApp -->
        <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.982l-1.413 5.162 5.283-1.385c1.455.792 3.105 1.21 4.787 1.211h.004c5.506 0 9.989-4.478 9.99-9.985.001-2.668-1.034-5.176-2.922-7.063a9.923 9.923 0 0 0-7.069-2.926zm5.83 14.161c-.246.692-1.242 1.282-1.71 1.339-.467.057-1.077.262-3.559-.728-2.981-1.189-4.908-4.218-5.057-4.417-.148-.198-1.212-1.613-1.212-3.076 0-1.463.766-2.183 1.038-2.481.272-.298.594-.372.792-.372.198 0 .396.002.569.01.184.009.431-.07.674.515.247.594.841 2.055.915 2.204.074.148.124.322.025.52-.099.198-.148.322-.297.495-.148.173-.312.387-.446.52-.148.148-.302.31-.13.605.173.297.771 1.272 1.654 2.058 1.135 1.011 2.091 1.325 2.388 1.473.297.148.471.124.644-.074.173-.198.742-.866.94-1.163.198-.297.396-.247.668-.148.272.099 1.731.816 2.028.965.297.148.495.223.569.347.074.124.074.718-.172 1.41z"/></svg>
        </a>
      </div>
    </div>

    <p class="copyright">
      © 2026 Burguer Zap Company. Todos os direitos reservados.
    </p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #0d0a08;
  color: #fbeed9;
  padding: 40px 20px 24px;
  text-align: center;
  border-top: 2px solid #291d15;
  width: 100%;
  box-sizing: border-box;
}

/* Banner Creme igual aos cards de produto do site */
.app-banner {
  background-color: #fbeed9;
  border-radius: 20px;
  padding: 28px 20px;
  margin: 0 auto 32px;
  max-width: 580px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.app-title {
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: #201812;
  line-height: 1.3;
}

.store-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.store-btn {
  background: #201812;
  color: #ffffff;
  padding: 12px 22px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.store-btn:hover {
  background: #ea580c;
  color: #ffffff;
  transform: translateY(-2px);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.footer-links a {
  color: #fbeed9;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #f5b700;
}

.social-section {
  margin-bottom: 24px;
}

.social-title {
  font-size: 1.1rem;
  margin-bottom: 14px;
  color: #f5b700;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-icon {
  width: 44px;
  height: 44px;
  background: #fbeed9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #201812;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.social-icon svg {
  width: 22px;
  height: 22px;
}

.social-icon:hover {
  background: #f5b700;
  color: #201812;
  transform: translateY(-3px);
}

.copyright {
  font-size: 0.8rem;
  color: #9c8c7c;
  margin: 0;
}
</style>