<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  showBackBtn: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['navigate', 'go-back'])

const isMenuOpen = ref(false)

const handleBack = () => {
  emit('go-back')
  emit('navigate', 'home')
}

const goTo = (page: string) => {
  emit('navigate', page)
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      
      <!-- ESQUERDA: Botão Voltar + Logo BK -->
      <div class="header-left">
        <button 
          v-if="showBackBtn" 
          type="button" 
          class="back-btn" 
          @click="handleBack"
          aria-label="Voltar"
        >
          ←
        </button>

        <!-- LOGO ESTILO BURGER KING -->
        <div class="bk-brand" @click="goTo('home')">
          <svg class="bun-top" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 24C10 9 35 2 60 2C85 2 110 9 115 24C115.5 25.5 114 27 112 27H8C6 27 4.5 25.5 5 24Z"/>
          </svg>
          
          <div class="brand-text">
            <span class="word-burguer">BURGUER</span>
            <span class="word-zap">ZAP</span>
          </div>

          <svg class="bun-bottom" viewBox="0 0 120 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2C25 2 95 2 114 2C116 2 117 3.5 116.5 5C112 12 85 16 60 16C35 16 8 12 3.5 5C3 3.5 4 2 6 2Z"/>
          </svg>
        </div>
      </div>

      <!-- DIREITA: NAVEGAÇÃO -->
      <nav class="nav-links">
        <button type="button" class="nav-btn" @click="goTo('home')">Início</button>
        <button type="button" class="nav-btn" @click="goTo('cardapio')">Cardápio</button>
        <button type="button" class="nav-btn cart-btn" @click="goTo('pedido')">
          🛒 <span class="cart-text">Meu Pedido</span> <span class="badge">1</span>
        </button>

        <!-- DROPDOWN TRÊS BARRAS -->
        <div class="more-wrapper">
          <button
            type="button"
            class="menu-toggle"
            :class="{ active: isMenuOpen }"
            @click="toggleMenu"
            :aria-expanded="isMenuOpen"
            aria-label="Mais opções"
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>

          <transition name="fade">
            <div v-if="isMenuOpen" class="more-dropdown">
              <button type="button" class="dropdown-item mobile-only" @click="goTo('home')">🏠 Início</button>
              <button type="button" class="dropdown-item mobile-only" @click="goTo('cardapio')">📜 Cardápio</button>
              <hr class="dropdown-divider mobile-only" />
              
              <button type="button" class="dropdown-item" @click="goTo('status')">📦 Acompanhar Pedido</button>
              <button type="button" class="dropdown-item" @click="goTo('novidades')">✨ Novidades</button>
              <button type="button" class="dropdown-item" @click="goTo('sobre')">ℹ️ Sobre o App</button>
              <button type="button" class="dropdown-item" @click="goTo('suporte')">💬 Suporte</button>
            </div>
          </transition>
        </div>
      </nav>
    </div>

    <div v-if="isMenuOpen" class="click-catcher" @click="closeMenu"></div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');

.header {
  background-color: #120d0a;
  border-bottom: 2px solid #291d15;
  width: 100%;
  position: relative;
  z-index: 100;
  box-sizing: border-box;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-btn {
  background: #2b2018;
  border: 1px solid #4a372a;
  color: #fbeed9;
  font-size: 1.1rem;
  font-weight: 700;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background-color: #f5b700;
  color: #120d0a;
  border-color: #f5b700;
}

/* BRANDING ESTILO BURGER KING (AMARELO DOURADO + ANIMAÇÃO) */
.bk-brand {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  padding: 4px;
  transition: transform 0.3s ease;
}

/* Animação ao passar o mouse */
.bk-brand:hover {
  transform: scale(1.1) rotate(-2deg);
}

.bk-brand:hover .bun-top {
  transform: translateY(2px);
}

.bk-brand:hover .bun-bottom {
  transform: translateY(-2px);
}

.bun-top {
  width: 70px;
  height: auto;
  margin-bottom: -3px;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.bun-top path {
  fill: #f5b700;
}

.brand-text {
  font-family: 'Titan One', 'Impact', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 0.82;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.word-burguer {
  color: #ffffff;
  font-size: 0.78rem;
  letter-spacing: 0.5px;
}

.word-zap {
  color: #f5b700;
  font-size: 0.95rem;
  letter-spacing: 1px;
}

.bun-bottom {
  width: 70px;
  height: auto;
  margin-top: -2px;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.bun-bottom path {
  fill: #f5b700;
}

/* NAV LINKS */
.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  background: transparent;
  border: none;
  color: #fbeed9;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}

.nav-btn:hover {
  background-color: #2b2018;
}

.cart-btn {
  background-color: #2b2018;
  border: 1px solid #3d2b1f;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart-btn:hover {
  background-color: #3d2b1f;
}

.badge {
  background-color: #ea580c;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 50%;
  line-height: 1;
}

/* DROPDOWN MENU */
.more-wrapper {
  position: relative;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
}

.menu-toggle:hover {
  background-color: #2b2018;
}

.menu-toggle .bar {
  width: 20px;
  height: 2px;
  background-color: #fbeed9;
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.menu-toggle.active .bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.more-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #1c1510;
  border: 1px solid #3d2b1f;
  border-radius: 14px;
  padding: 8px;
  min-width: 200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 101;
}

.dropdown-item {
  background: transparent;
  border: none;
  color: #fbeed9;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.dropdown-item:hover {
  background-color: #f5b700;
  color: #120d0a;
}

.dropdown-item.mobile-only {
  display: none;
}

.dropdown-divider.mobile-only {
  display: none;
  border: none;
  border-top: 1px solid #3d2b1f;
  margin: 4px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.click-catcher {
  position: fixed;
  inset: 0;
  z-index: 90;
}

/* RESPONSIVIDADE */
@media (max-width: 640px) {
  .nav-btn:not(.cart-btn) {
    display: none;
  }

  .dropdown-item.mobile-only,
  .dropdown-divider.mobile-only {
    display: flex;
  }
}

@media (max-width: 400px) {
  .cart-text {
    display: none;
  }
}
</style>