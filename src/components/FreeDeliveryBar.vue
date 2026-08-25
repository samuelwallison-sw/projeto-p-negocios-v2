<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  subtotal: number
}>()

const GOAL = 50.0 // Meta de R$ 50,00 para frete grátis

const remaining = computed(() => {
  const diff = GOAL - props.subtotal
  return diff > 0 ? diff : 0
})

const percentage = computed(() => {
  const pct = (props.subtotal / GOAL) * 100
  return pct > 100 ? 100 : pct
})

const hasFreeDelivery = computed(() => props.subtotal >= GOAL)
</script>

<template>
  <div class="frete-bar-container">
    <div class="frete-bar-text">
      <span v-if="!hasFreeDelivery">
        Faltam <strong>R$ {{ remaining.toFixed(2) }}</strong> para você ganhar <strong>Frete Grátis!</strong>
      </span>
      <span v-else class="sucesso">
        🎉 Parabéns! Você ganhou <strong>Frete Grátis!</strong>
      </span>
    </div>

    <div class="progress-bg">
      <div 
        class="progress-fill" 
        :style="{ width: percentage + '%' }"
        :class="{ 'is-free': hasFreeDelivery }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.frete-bar-container {
  background: #1b1512;
  border: 1px solid #33291f;
  padding: 14px 18px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.frete-bar-text {
  font-size: 0.9rem;
  color: #f7f1e8;
  margin-bottom: 8px;
  text-align: center;
}

.frete-bar-text strong {
  color: #f5b700;
}

.frete-bar-text .sucesso {
  color: #2ecc71;
  font-weight: bold;
}

.progress-bg {
  width: 100%;
  height: 8px;
  background: #241c17;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #e2542d 0%, #f5b700 100%);
  transition: width 0.4s ease;
  border-radius: 10px;
}

.progress-fill.is-free {
  background: #2ecc71;
}
</style>