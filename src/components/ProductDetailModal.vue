<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'add-to-cart'])

// Lista reativa para controlar a remoção de cada ingrediente
const ingredientsState = ref<Array<{ name: string; removed: boolean }>>([])

// Atualiza a lista quando o produto muda
watch(() => props.product, (newProduct) => {
  if (newProduct && newProduct.ingredients) {
    ingredientsState.value = newProduct.ingredients.map((ing: string) => ({
      name: ing,
      removed: false
    }))
  } else {
    ingredientsState.value = []
  }
}, { immediate: true })

const toggleIngredient = (index: number) => {
  ingredientsState.value[index].removed = !ingredientsState.value[index].removed
}

const handleAddToCart = () => {
  const removed = ingredientsState.value
    .filter(i => i.removed)
    .map(i => i.name)

  emit('add-to-cart', {
    ...props.product,
    customizations: { removed }
  })
}
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <button class="close-btn" @click="$emit('close')">✕</button>

      <div class="product-image-container">
        <img :src="product.image" :alt="product.title" />
      </div>

      <div class="modal-body">
        <h2>{{ product.title }}</h2>
        <p class="description">{{ product.description }}</p>

        <!-- Seção de Remoção de Ingredientes -->
        <div v-if="ingredientsState.length > 0" class="customization-section">
          <h3>📋 Deseja remover algum ingrediente?</h3>
          <p class="subtitle">Desmarque os itens que não quer no seu lanche:</p>

          <div class="ingredients-list">
            <label 
              v-for="(item, index) in ingredientsState" 
              :key="item.name" 
              class="ingredient-item"
            >
              <span class="ingredient-name" :class="{ removed: item.removed }">
                {{ item.name }}
              </span>

              <input 
                type="checkbox" 
                :checked="!item.removed" 
                @change="toggleIngredient(index)"
                class="checkbox-custom"
              />
            </label>
          </div>
        </div>

        <div class="modal-footer">
          <div class="price-tag">
            <span>R$ {{ product.price.toFixed(2) }}</span>
          </div>

          <button class="btn-add" @click="handleAddToCart">
            🛒 Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 15px;
}

.modal-container {
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  z-index: 10;
}

.product-image-container img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.modal-body {
  padding: 20px;
}

.modal-body h2 {
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 6px;
  font-weight: 800;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 18px;
}

.customization-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 20px;
  border: 1px solid #eaeaea;
}

.customization-section h3 {
  font-size: 0.95rem;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.subtitle {
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 12px;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.ingredient-item:last-child {
  border-bottom: none;
}

.ingredient-name {
  font-size: 0.95rem;
  color: #333;
  font-weight: 600;
}

.ingredient-name.removed {
  text-decoration: line-through;
  color: #dc2626;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  accent-color: #fecc00;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.price-tag span {
  font-size: 1.3rem;
  font-weight: 900;
  color: #1a1a1a;
}

.btn-add {
  background-color: #fecc00;
  color: #1a1a1a;
  border: none;
  padding: 12px 22px;
  font-size: 0.95rem;
  font-weight: 800;
  border-radius: 30px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #e6b800;
}
</style>