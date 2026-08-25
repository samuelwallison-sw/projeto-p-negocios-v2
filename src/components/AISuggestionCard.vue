<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getAISuggestion } from '@/services/aiUpsell'

const props = defineProps<{
  cartItems?: any[]
  carrinho?: any[]
}>()

const emit = defineEmits(['add-item'])

const suggestion = ref<any>(null)
const loading = ref(false)

const loadSuggestion = async () => {
  const items = props.cartItems || props.carrinho || []
  if (items.length === 0) {
    suggestion.value = null
    return
  }

  loading.value = true
  try {
    const res = await getAISuggestion(items)
    suggestion.value = res
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

watch(() => props.cartItems || props.carrinho, () => {
  loadSuggestion()
}, { deep: true })

onMounted(() => {
  loadSuggestion()
})

const handleAdd = () => {
  if (suggestion.value) {
    emit('add-item', suggestion.value)
  }
}
</script>

<template>
  <div v-if="suggestion || loading" class="ai-card">
    <div v-if="loading" class="ai-loading">
      🤖 IA analisando seu pedido...
    </div>

    <div v-else-if="suggestion" class="ai-content">
      <div class="ai-header">
        <span class="ai-badge">🤖 RECOMENDAÇÃO DA IA</span>
        <p class="ai-reason">{{ suggestion.reason || 'Combina perfeitamente com o seu pedido!' }}</p>
      </div>

      <div class="ai-product">
        <img v-if="suggestion.image" :src="suggestion.image" :alt="suggestion.name" class="ai-img" />
        <div class="ai-info">
          <h4>{{ suggestion.name }}</h4>
          <span class="ai-price">R$ {{ Number(suggestion.price).toFixed(2) }}</span>
        </div>
        <button class="btn-add-ai" @click="handleAdd">
          + Adicionar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-card {
  background: #241c17;
  border: 1px solid #f5b700;
  border-radius: 14px;
  padding: 16px;
  margin-top: 16px;
}

.ai-loading {
  font-size: 0.85rem;
  color: #ab9d8d;
  text-align: center;
}

.ai-badge {
  font-size: 0.7rem;
  font-weight: 800;
  color: #f5b700;
  letter-spacing: 0.8px;
}

.ai-reason {
  font-size: 0.82rem;
  color: #f7f1e8;
  margin: 4px 0 12px;
}

.ai-product {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1b1512;
  padding: 10px;
  border-radius: 10px;
}

.ai-img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

.ai-info {
  flex: 1;
}

.ai-info h4 {
  margin: 0;
  font-size: 0.9rem;
  color: #f7f1e8;
}

.ai-price {
  font-size: 0.82rem;
  color: #f5b700;
  font-weight: bold;
}

.btn-add-ai {
  background: #f5b700;
  color: #201812;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
}

.btn-add-ai:hover {
  background: #ffc82e;
}
</style>