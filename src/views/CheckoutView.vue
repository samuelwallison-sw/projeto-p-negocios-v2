<script setup lang="ts">
import { ref, computed } from 'vue'

// IMPORTS DOS COMPONENTES
import FreeDeliveryBar from '@/components/FreeDeliveryBar.vue'
import AISuggestionCard from '@/components/AISuggestionCard.vue'

const emit = defineEmits(['order-confirmed'])

const cartItems = ref([
  {
    id: 2,
    name: 'Master Cheddar',
    price: 26.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80',
    removedIngredients: []
  }
])

const deliveryType = ref<'delivery' | 'pickup'>('delivery')
const paymentMethod = ref<'pix' | 'card' | 'cash'>('pix')

const address = ref({
  street: '',
  number: '',
  neighborhood: '',
  reference: ''
})

const deliveryFee = computed(() => deliveryType.value === 'delivery' ? 5.00 : 0.00)

const subtotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
})

const total = computed(() => subtotal.value + deliveryFee.value)

const totalItemsCount = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.quantity, 0)
})

const updateQuantity = (index: number, change: number) => {
  const item = cartItems.value[index]
  if (!item) return

  item.quantity += change
  if (item.quantity <= 0) {
    cartItems.value.splice(index, 1)
  }
}

// FUNÇÃO PARA ADICIONAR O ITEM SUGERIDO PELA IA AO CARRINHO
const handleAddItem = (newItem: any) => {
  const existingItem = cartItems.value.find(item => item.id === newItem.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.value.push({
      ...newItem,
      quantity: 1,
      removedIngredients: []
    })
  }
}

const handleSendOrder = () => {
  if (cartItems.value.length === 0) {
    alert('Seu carrinho está vazio!')
    return
  }

  if (deliveryType.value === 'delivery' && (!address.value.street || !address.value.number || !address.value.neighborhood)) {
    alert('Por favor, preencha os campos obrigatórios do endereço de entrega.')
    return
  }

  emit('order-confirmed', {
    items: cartItems.value,
    deliveryType: deliveryType.value,
    paymentMethod: paymentMethod.value,
    address: address.value,
    subtotal: subtotal.value,
    deliveryFee: deliveryFee.value,
    total: total.value
  })
}
</script>

<template>
  <div class="checkout-wrapper">
    <!-- BANNER HERO -->
    <div class="checkout-hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-tag">FINALIZAR PEDIDO</span>
        <h1>Quase pronto para saborear!</h1>
        <p>Confirme os itens do seu carrinho e escolha a forma de entrega e pagamento.</p>
      </div>
    </div>

    <div class="checkout-container">
      
      <!-- BARRA DE FRETE GRÁTIS NO TOPO DO CHECKOUT -->
      <FreeDeliveryBar :subtotal="subtotal" />

      <div class="checkout-grid">

        <!-- COLUNA DA ESQUERDA: CARRINHO -->
        <div class="checkout-card main-card">
          <div class="card-header">
            <h2>Seu carrinho</h2>
            <span class="item-badge">{{ totalItemsCount }} {{ totalItemsCount === 1 ? 'item' : 'itens' }}</span>
          </div>

          <div v-if="cartItems.length === 0" class="empty-cart">
            <p>Seu carrinho está vazio 🍔</p>
          </div>

          <div v-else class="cart-items-list">
            <div v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" class="item-img" />

              <div class="item-info">
                <h3>{{ item.name }}</h3>
                <span class="item-unit-price">R$ {{ item.price.toFixed(2) }} un.</span>

                <div v-if="item.removedIngredients && item.removedIngredients.length > 0" class="removed-notes">
                  <small>Sem: {{ item.removedIngredients.join(', ') }}</small>
                </div>
              </div>

              <div class="item-actions">
                <div class="quantity-controls">
                  <button @click="updateQuantity(index, -1)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="updateQuantity(index, 1)">+</button>
                </div>
                <span class="item-total-price">R$ {{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- CARD DA IA ABAIXO DA LISTA DE ITENS -->
          <AISuggestionCard :cartItems="cartItems" @add-item="handleAddItem" />
        </div>

        <!-- COLUNA DA DIREITA: ENTREGA, PAGAMENTO E RESUMO -->
        <div class="checkout-sidebar">

          <!-- FORMA DE ENTREGA -->
          <div class="checkout-card">
            <div class="card-header-small">Forma de entrega</div>

            <div class="toggle-buttons">
              <button
                :class="{ active: deliveryType === 'delivery' }"
                @click="deliveryType = 'delivery'"
              >
                🛵 Delivery <span class="fee-tag">+R$ 5,00</span>
              </button>
              <button
                :class="{ active: deliveryType === 'pickup' }"
                @click="deliveryType = 'pickup'"
              >
                🏬 Retirar na loja
              </button>
            </div>

            <div v-if="deliveryType === 'delivery'" class="address-form">
              <input
                v-model="address.street"
                type="text"
                placeholder="Rua / Avenida *"
                class="dark-input"
              />
              <div class="input-row">
                <input
                  v-model="address.number"
                  type="text"
                  placeholder="Número *"
                  class="dark-input"
                />
                <input
                  v-model="address.neighborhood"
                  type="text"
                  placeholder="Bairro *"
                  class="dark-input"
                />
              </div>
              <input
                v-model="address.reference"
                type="text"
                placeholder="Ponto de referência (opcional)"
                class="dark-input"
              />
            </div>
          </div>

          <!-- FORMA DE PAGAMENTO -->
          <div class="checkout-card">
            <div class="card-header-small">Forma de pagamento</div>

            <div class="payment-grid">
              <button
                :class="{ active: paymentMethod === 'pix' }"
                @click="paymentMethod = 'pix'"
              >
                ⚡ Pix
              </button>
              <button
                :class="{ active: paymentMethod === 'card' }"
                @click="paymentMethod = 'card'"
              >
                💳 Cartão
              </button>
              <button
                :class="{ active: paymentMethod === 'cash' }"
                @click="paymentMethod = 'cash'"
              >
                💵 Dinheiro
              </button>
            </div>
          </div>

          <!-- RESUMO -->
          <div class="checkout-card summary-card">
            <div class="summary-line">
              <span>Subtotal</span>
              <span>R$ {{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-line">
              <span>Taxa de entrega</span>
              <span>R$ {{ deliveryFee.toFixed(2) }}</span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-total">
              <span>Total a pagar</span>
              <span class="total-amount">R$ {{ total.toFixed(2) }}</span>
            </div>

            <button class="btn-confirm-order" @click="handleSendOrder">
              Confirmar e enviar pedido →
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-wrapper {
  --bg: #120d0a;
  --surface: #1b1512;
  --surface-alt: #241c17;
  --border: #33291f;
  --accent: #f5b700;
  --accent-2: #e2542d;
  --text: #f7f1e8;
  --text-muted: #ab9d8d;

  background-color: var(--bg);
  min-height: 100vh;
  width: 100%;
  color: var(--text);
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
}

/* HERO */
.checkout-hero-section {
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  padding: 56px 20px 88px;
  text-align: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 13, 10, 0.85) 0%, var(--bg) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 720px;
  margin: 0 auto;
}

.hero-tag {
  display: inline-block;
  background: rgba(245, 183, 0, 0.14);
  color: var(--accent);
  border: 1px solid rgba(245, 183, 0, 0.35);
  font-weight: 800;
  font-size: 0.72rem;
  padding: 6px 16px;
  border-radius: 20px;
  letter-spacing: 1.2px;
}

.checkout-hero-section h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.7rem, 3.6vw, 2.3rem);
  font-weight: 600;
  margin: 16px 0 8px;
}

.checkout-hero-section p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* CONTAINER */
.checkout-container {
  max-width: 1140px;
  margin: -48px auto 0;
  padding: 0 20px 70px;
  position: relative;
  z-index: 10;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
}

@media (min-width: 850px) {
  .checkout-grid {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
  }
}

/* CARDS */
.checkout-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 22px;
  margin-bottom: 20px;
}

.checkout-sidebar .checkout-card:last-child {
  margin-bottom: 0;
}

.main-card {
  margin-bottom: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

.card-header h2 {
  font-family: 'Fraunces', serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.item-badge {
  background: rgba(245, 183, 0, 0.14);
  color: var(--accent);
  font-weight: 700;
  font-size: 0.78rem;
  padding: 4px 12px;
  border-radius: 20px;
}

.card-header-small {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--text-muted);
  letter-spacing: 0.6px;
  text-transform: uppercase;
  margin-bottom: 14px;
}

/* CARRINHO */
.empty-cart {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted);
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--surface-alt);
  padding: 12px;
  border-radius: 14px;
}

.item-img {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-info h3 {
  font-size: 0.96rem;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--text);
}

.item-unit-price {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.removed-notes {
  margin-top: 4px;
  color: var(--accent-2);
  font-size: 0.75rem;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.quantity-controls button {
  background: none;
  border: none;
  color: var(--accent);
  padding: 5px 11px;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
}

.quantity-controls button:hover {
  background: var(--surface-alt);
}

.quantity-controls span {
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0 6px;
  color: var(--text);
}

.item-total-price {
  font-weight: 800;
  color: var(--accent);
  font-size: 0.95rem;
}

/* TOGGLES */
.toggle-buttons,
.payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.toggle-buttons button,
.payment-grid button {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 12px 8px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.toggle-buttons button:hover,
.payment-grid button:hover {
  border-color: var(--accent);
  color: var(--text);
}

.toggle-buttons button.active,
.payment-grid button.active {
  background: var(--accent);
  color: #201812;
  border-color: var(--accent);
}

.fee-tag {
  font-size: 0.7rem;
  opacity: 0.85;
}

/* INPUTS */
.address-form {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dark-input {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 12px;
  border-radius: 10px;
  font-size: 0.85rem;
  outline: none;
  font-family: inherit;
}

.dark-input::placeholder {
  color: var(--text-muted);
}

.dark-input:focus {
  border-color: var(--accent);
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* RESUMO */
.summary-line {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.summary-divider {
  height: 1px;
  background: var(--border);
  margin: 12px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 800;
  font-size: 1.02rem;
  margin-bottom: 18px;
  color: var(--text);
}

.total-amount {
  font-size: 1.4rem;
  color: var(--accent);
}

.btn-confirm-order {
  width: 100%;
  background: var(--accent);
  color: #201812;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.98rem;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
}

.btn-confirm-order:hover {
  background: #ffc82e;
  transform: translateY(-2px);
}
</style>