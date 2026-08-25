<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
<<<<<<< HEAD
import Footer from './components/Footer.vue'
import HomeView from './views/HomeView.vue'
import MenuView from './views/MenuView.vue'
import CheckoutView from './views/CheckoutView.vue'
import NovidadesView from './views/NovidadesView.vue'
import SobreView from './views/SobreView.vue'
import SuporteView from './views/SuporteView.vue'
import OrderStatusView from './views/OrderStatusView.vue'
=======
import HomeView from './Views/HomeView.vue'
import MenuView from './Views/MenuView.vue'
import CheckoutView from './Views/CheckoutView.vue'
import NovidadesView from './Views/NovidadesView.vue'
import SobreView from './Views/SobreView.vue'
import SuporteView from './Views/SuporteView.vue'
>>>>>>> fa14b94c35a4b99dcc5652c82d869993e96738b1

const currentTab = ref('home')
const lastOrder = ref<any>(null)

const handleNavigate = (page: string) => {
  currentTab.value = page
}

const handleGoBack = () => {
  // Retorna para a Home ao clicar no botão voltar do Header
  currentTab.value = 'home'
}

const handleOrderConfirmed = (orderData: any) => {
  lastOrder.value = orderData
  currentTab.value = 'status'
}
</script>

<template>
  <div class="page-container">
    <Header 
      :show-back-btn="currentTab !== 'home'" 
      @navigate="handleNavigate" 
      @go-back="handleGoBack" 
    />

    <main class="page-content">
      <HomeView v-if="currentTab === 'home'" @navigate="handleNavigate" />
      <MenuView v-else-if="currentTab === 'cardapio'" />
      <CheckoutView v-else-if="currentTab === 'pedido'" @order-confirmed="handleOrderConfirmed" />

      <OrderStatusView
        v-else-if="currentTab === 'status' && lastOrder"
        :order="lastOrder"
        @navigate="handleNavigate"
      />

      <div v-else-if="currentTab === 'status' && !lastOrder" class="no-order-state">
        <span class="no-order-icon">📦</span>
        <h2>Você ainda não fez nenhum pedido</h2>
        <p>Que tal dar uma olhada no nosso cardápio e escolher algo gostoso?</p>
        <button class="no-order-btn" @click="handleNavigate('cardapio')">Ver cardápio →</button>
      </div>

      <NovidadesView v-else-if="currentTab === 'novidades'" />
      <SobreView v-else-if="currentTab === 'sobre'" />
      <SuporteView v-else-if="currentTab === 'suporte'" />
    </main>

    <Footer />
  </div>
</template>

<style>
/* Reset de fontes do Google Fonts estilo BK */
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

:root {
  --font-title: 'Lilita One', cursive, sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
}

/* Reset absoluto sobrescrevendo os estilos padrão do Vite */
:root, html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  min-height: 100vh !important;
  background-color: #000000 !important;
  color: #ffffff;
  font-family: var(--font-body);
}

/* Aplica a fonte estilosa gordinha aos títulos */
h1, h2, h3, .logo {
  font-family: var(--font-title);
  letter-spacing: 0.5px;
}

/* Anula a trava de layout padrão do Vite */
#app {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
  background-color: #000000 !important;
}

.page-container {
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1; /* Garante que o rodapé sempre fique no final da tela */
}

/* ESTADO: NENHUM PEDIDO AINDA */
.no-order-state {
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  background-color: #120d0a;
  color: #f7f1e8;
  box-sizing: border-box;
}

.no-order-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.7;
}

.no-order-state h2 {
  font-size: 1.6rem;
  margin: 0 0 10px;
  color: #ffffff;
}

.no-order-state p {
  color: #ab9d8d;
  font-size: 0.92rem;
  margin: 0 0 24px;
  max-width: 320px;
}

.no-order-btn {
  background: #f5b700;
  color: #201812;
  border: none;
  padding: 13px 28px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
}

.no-order-btn:hover {
  background: #ffc82e;
  transform: translateY(-2px);
}
</style>
