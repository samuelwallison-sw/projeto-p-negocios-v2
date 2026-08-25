<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['add-to-cart'])

const selectedCategory = ref<string>('all')
const selectedProductModal = ref<any>(null)

// Controle da aba ativa dentro do Modal
const activeModalTab = ref<'ingredients' | 'allergies'>('ingredients')

// Lista de ingredientes desmarcados/removidos pelo usuário
const removedIngredients = ref<string[]>([])

// CATEGORIAS
const categories = [
  { id: 'burgers', name: 'Sanduíches & Burgers', icon: '🍔' },
  { id: 'sides', name: 'Acompanhamentos', icon: '🍟' },
  { id: 'desserts', name: 'Sobremesas', icon: '🍦' },
  { id: 'drinks', name: 'Bebidas Frias', icon: '🥤' }
]

// LISTA DE PRODUTOS COMPLETA
const products = ref([
  // BURGERS
  {
    id: 1,
    category: 'burgers',
    name: 'Smash Bacon',
    description: '2x Smash 90g, muito bacon crocante e cheddar cremoso no pão brioche.',
    ingredients: ['Pão Brioche', '2x Blend Smash 90g', 'Queijo Cheddar Fatiado', 'Bacon Crocante', 'Maionese da Casa'],
    allergens: ['Glúten', 'Lactose', 'Derivados de Soja'],
    labels: ['🔥 Mais Vendido', '🥓 Contém Bacon'],
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    category: 'burgers',
    name: 'Master Cheddar',
    description: 'Blend 150g, queijo prato, picles, cebola roxa e molho especial Zap.',
    ingredients: ['Pão com Gergelim', 'Blend bovino 150g', 'Queijo Prato', 'Picles artesanal', 'Cebola roxa', 'Molho Zap'],
    allergens: ['Glúten', 'Lactose', 'Gergelim'],
    labels: ['⭐ Artesanal'],
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    category: 'burgers',
    name: 'Duplo Salada Burger',
    description: 'Dois hambúrgueres bovinos, alface fresca, tomate, queijo duplo e maionese verde.',
    ingredients: ['Pão Tradicional', '2x Blend Bovino 100g', 'Queijo Muçarela', 'Alface Americana', 'Tomate', 'Maionese Verde'],
    allergens: ['Glúten', 'Lactose', 'Ovos'],
    labels: ['🥬 Clássico'],
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80'
  },

  // ACOMPANHAMENTOS
  {
    id: 4,
    category: 'sides',
    name: 'Batata Rústica',
    description: 'Porção grande com molho de queijo cheddar e farofa de bacon crocante.',
    ingredients: ['Batatas rústicas fritas', 'Molho de queijo cheddar', 'Farofa de bacon'],
    allergens: ['Lactose'],
    labels: ['🍟 Porção Grande'],
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    category: 'sides',
    name: 'Bolinho de Carne Desfiada (6un)',
    description: 'Bolinhos crocantes recheados com cupim suculento desfiado e queijo derretido.',
    ingredients: ['Carne de cupim desfiada', 'Massa de mandioca temperada', 'Queijo muçarela', 'Farinha panko'],
    allergens: ['Glúten', 'Lactose'],
    labels: ['🥩 Artesanal', '🔥 Sucesso'],
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    category: 'sides',
    name: 'Frango Crocante Strips',
    description: 'Tiras de peito de frango empanadas na farinha panko bem crocante, com molho mostarda e mel.',
    ingredients: ['Tiras de peito de frango', 'Empanado Panko crocante', 'Ervas finas', 'Molho Mostarda e Mel'],
    allergens: ['Glúten', 'Ovos'],
    labels: ['🍗 Super Crocante'],
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80'
  },

  // SOBREMESAS
  {
    id: 7,
    category: 'desserts',
    name: 'Milkshake de Ovomaltine',
    description: '400ml de pura cremosidade com calda de chocolate e flocos crocantes.',
    ingredients: ['Sorvete de baunilha', 'Leite integral', 'Ovomaltine', 'Calda de chocolate fudge'],
    allergens: ['Lactose', 'Glúten', 'Cevada'],
    labels: ['🍦 400ml', '⭐ Especial'],
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    category: 'desserts',
    name: 'Sundae de Morango',
    description: 'Sorvete cremoso de baunilha coberto com calda especial de morango com pedaços.',
    ingredients: ['Sorvete de baunilha', 'Calda de morango artesanal', 'Castanhas picadas'],
    allergens: ['Lactose', 'Castanhas'],
    labels: ['🍓 Doce de Verão'],
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80'
  },

  // BEBIDAS
  {
    id: 9,
    category: 'drinks',
    name: 'Coca-Cola Zero 350ml',
    description: 'Lata trincando de gelada de 350ml.',
    ingredients: ['Água carbonatada', 'Extrato de noz de cola', 'Cafeína', 'Adoçantes artificiais'],
    allergens: ['Não contém glúten', 'Contém Fenilalanina'],
    labels: ['🥤 Gelado'],
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 10,
    category: 'drinks',
    name: 'Guaraná Antarctica 350ml',
    description: 'Lata de 350ml bem gelada com o sabor original do guaraná.',
    ingredients: ['Água carbonatada', 'Açúcar', 'Extrato de guaraná', 'Acidulante ácido cítrico'],
    allergens: ['Não contém glúten'],
    labels: ['🥤 Gelado', '🇧🇷 Original'],
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 11,
    category: 'drinks',
    name: 'Água Mineral 500ml',
    description: 'Garrafa de água mineral pura e refrescante (Com ou Sem gás).',
    ingredients: ['Água mineral natural'],
    allergens: ['Não contém glúten', 'Sem alergênicos'],
    labels: ['💧 Refrescante'],
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&auto=format&fit=crop&q=80'
  }
])

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products.value
  return products.value.filter(p => p.category === selectedCategory.value)
})

const openModal = (product: any) => {
  selectedProductModal.value = product
  removedIngredients.value = []
  activeModalTab.value = 'ingredients'
}

const toggleIngredient = (ing: string) => {
  if (removedIngredients.value.includes(ing)) {
    removedIngredients.value = removedIngredients.value.filter(item => item !== ing)
  } else {
    removedIngredients.value.push(ing)
  }
}

const handleAddToCart = (product: any) => {
  const itemToAdd = {
    ...product,
    removedIngredients: [...removedIngredients.value]
  }
  emit('add-to-cart', itemToAdd)
  selectedProductModal.value = null
}
</script>

<template>
  <div class="menu-wrapper">
    <!-- BANNER HERO -->
    <div class="menu-hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-tag">CARDÁPIO COMPLETO</span>
        <h1>Escolha suas categorias favoritas</h1>
        <p>Navegue pelas nossas opções e veja a composição de cada prato</p>
      </div>
    </div>

    <div class="menu-page">
      <!-- TABS DE CATEGORIA -->
      <div class="tabs-bar">
        <button
          :class="{ active: selectedCategory === 'all' }"
          @click="selectedCategory = 'all'"
        >
          <span class="tab-icon">⭐</span> Todos
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          <span class="tab-icon">{{ cat.icon }}</span> {{ cat.name }}
        </button>
      </div>

      <!-- LISTA DE PRODUTOS -->
      <div class="products-section">
        <div class="section-header">
          <h2>
            {{ selectedCategory === 'all' ? 'Todos os Produtos' : categories.find(c => c.id === selectedCategory)?.name }}
          </h2>
          <span class="product-count">{{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'item' : 'itens' }}</span>
        </div>

        <div class="products-grid">
          <article v-for="product in filteredProducts" :key="product.id" class="product-card">
            <div class="product-image-container">
              <img :src="product.image" :alt="product.name" />
              <div class="labels-row" v-if="product.labels">
                <span v-for="(lbl, idx) in product.labels" :key="idx" class="badge-label">{{ lbl }}</span>
              </div>
            </div>

            <div class="product-details">
              <h3 class="product-title">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>

              <!-- LINK DE PERSONALIZAR MODERNO -->
              <button type="button" class="customize-link" @click="openModal(product)">
                ⚙️ Personalizar & Alergênicos
              </button>

              <!-- RODAPÉ DO CARD -->
              <div class="product-footer">
                <div class="price-container">
                  <span class="currency">R$</span>
                  <span class="price-value">{{ product.price.toFixed(2) }}</span>
                </div>

                <button type="button" class="add-btn" @click="handleAddToCart(product)">
                  <span class="plus-icon">+</span>
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- MODAL DE DETALHES -->
      <div v-if="selectedProductModal" class="modal-overlay" @click.self="selectedProductModal = null">
        <div class="ingredients-modal">
          <button class="close-btn" @click="selectedProductModal = null">✕</button>
          <img :src="selectedProductModal.image" class="modal-img" />
          <h2>{{ selectedProductModal.name }}</h2>
          <p class="modal-desc">{{ selectedProductModal.description }}</p>

          <div class="modal-tabs">
            <button
              :class="{ active: activeModalTab === 'ingredients' }"
              @click="activeModalTab = 'ingredients'"
            >
              🥗 Ingredientes
            </button>
            <button
              :class="{ active: activeModalTab === 'allergies' }"
              @click="activeModalTab = 'allergies'"
            >
              ⚠️ Alergênicos
            </button>
          </div>

          <!-- ABA INGREDIENTES -->
          <div v-if="activeModalTab === 'ingredients'" class="tab-content">
            <p class="sub-instruction">Desmarque os ingredientes que deseja remover do pedido:</p>
            <div class="ingredients-checklist">
              <label
                v-for="(ing, i) in selectedProductModal.ingredients"
                :key="i"
                class="check-item"
                :class="{ removed: removedIngredients.includes(ing) }"
              >
                <input
                  type="checkbox"
                  :checked="!removedIngredients.includes(ing)"
                  @change="toggleIngredient(ing)"
                />
                <span>{{ ing }}</span>
                <small v-if="removedIngredients.includes(ing)" class="removed-tag">Removido</small>
              </label>
            </div>
          </div>

          <!-- ABA ALERGÊNICOS -->
          <div v-if="activeModalTab === 'allergies'" class="tab-content">
            <div class="allergen-box">
              <h4>Atenção para alérgicos</h4>
              <p>Este produto contém ou pode conter vestígios de:</p>
              <ul>
                <li v-for="(alg, idx) in selectedProductModal.allergens" :key="idx">{{ alg }}</li>
              </ul>
            </div>
          </div>

          <div class="modal-footer">
            <div class="price-container">
              <span class="currency">R$</span>
              <span class="price-value">{{ selectedProductModal.price.toFixed(2) }}</span>
            </div>
            <button class="add-btn" @click="handleAddToCart(selectedProductModal)">Adicionar ao pedido</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-wrapper {
  --bg: #120d0a;
  --surface: #18120e;
  --surface-alt: #241c17;
  --border: #2d1f17;
  --accent: #f5b700;
  --accent-2: #e2542d;
  --text: #f7f1e8;
  --text-muted: #a89a8e;

  background-color: var(--bg);
  min-height: 100vh;
  width: 100%;
  color: var(--text);
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
}

/* HERO */
.menu-hero-section {
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  padding: 64px 20px 96px;
  text-align: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 13, 10, 0.82) 0%, var(--bg) 100%);
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

.menu-hero-section h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  font-weight: 600;
  margin: 18px 0 10px;
}

.menu-hero-section p {
  color: var(--text-muted);
  font-size: 1rem;
}

/* PAGE */
.menu-page {
  max-width: 1140px;
  margin: -56px auto 0;
  padding: 0 20px 70px;
  position: relative;
  z-index: 10;
}

/* TABS */
.tabs-bar {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 6px 0 16px;
  margin-bottom: 34px;
  scrollbar-width: none;
}

.tabs-bar::-webkit-scrollbar {
  display: none;
}

.tabs-bar button {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.tabs-bar button:hover {
  border-color: var(--accent);
  color: var(--text);
}

.tabs-bar button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #120d0a;
}

.tab-icon {
  font-size: 1rem;
}

/* PRODUTOS */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 22px;
}

.section-header h2 {
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.product-count {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 600;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 22px;
}

/* CARDS DESIGN REFORMULADO */
.product-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(245, 183, 0, 0.15);
}

.product-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
  background-color: #0d0907;
}

.product-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image-container img {
  transform: scale(1.05);
}

.labels-row {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge-label {
  background: rgba(18, 13, 10, 0.85);
  backdrop-filter: blur(4px);
  color: var(--accent);
  border: 1px solid rgba(245, 183, 0, 0.3);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 8px;
}

.product-details {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-title {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0 0 6px 0;
}

.product-description {
  color: var(--text-muted);
  font-size: 0.82rem;
  line-height: 1.4;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

/* LINK DE PERSONALIZAR */
.customize-link {
  background: transparent;
  border: none;
  color: #d1ab7d;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 0;
  margin-bottom: 16px;
  cursor: pointer;
  text-align: left;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s ease;
  width: fit-content;
}

.customize-link:hover {
  color: var(--accent);
  text-decoration: underline;
}

/* RODAPÉ E BOTÃO DE PREÇO */
.product-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #261a13;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 3px;
  color: var(--accent);
}

.currency {
  font-size: 0.85rem;
  font-weight: 700;
}

.price-value {
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: -0.5px;
}

.add-btn {
  background: linear-gradient(135deg, #f5b700 0%, #e6a100 100%);
  color: #120d0a;
  border: none;
  border-radius: 12px;
  padding: 9px 16px;
  font-weight: 800;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(245, 183, 0, 0.25);
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: linear-gradient(135deg, #ffc414 0%, #f5b700 100%);
  transform: scale(1.04);
  box-shadow: 0 6px 16px rgba(245, 183, 0, 0.4);
}

.add-btn:active {
  transform: scale(0.98);
}

.plus-icon {
  font-size: 1.1rem;
  line-height: 1;
  font-weight: 900;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8, 6, 4, 0.78);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 15px;
}

.ingredients-modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  max-width: 440px;
  width: 100%;
  padding: 24px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  color: var(--text);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--surface-alt);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-weight: bold;
  color: var(--text);
}

.modal-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 14px;
}

.ingredients-modal h2 {
  font-family: 'Fraunces', serif;
  font-size: 1.3rem;
  margin: 0 0 6px;
}

.modal-desc {
  font-size: 0.86rem;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.modal-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}

.modal-tabs button {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  padding: 8px 12px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
}

.modal-tabs button.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.sub-instruction {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.ingredients-checklist {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--surface-alt);
  padding: 12px;
  border-radius: 12px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  cursor: pointer;
}

.check-item.removed span {
  text-decoration: line-through;
  color: var(--text-muted);
}

.removed-tag {
  color: var(--accent-2);
  font-size: 0.7rem;
  font-weight: bold;
  margin-left: auto;
}

.allergen-box {
  background: rgba(226, 84, 45, 0.1);
  border: 1px solid rgba(226, 84, 45, 0.3);
  padding: 14px;
  border-radius: 12px;
}

.allergen-box h4 {
  color: var(--accent-2);
  margin: 0 0 6px 0;
  font-size: 0.9rem;
}

.allergen-box p {
  font-size: 0.8rem;
  color: var(--text);
  margin-bottom: 8px;
}

.allergen-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.allergen-box li::before {
  content: '• ';
  color: var(--accent-2);
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}
</style>