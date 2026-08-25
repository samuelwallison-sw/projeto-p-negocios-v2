<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  order: {
    items: any[]
    deliveryType: 'delivery' | 'pickup'
    paymentMethod: 'pix' | 'card' | 'cash'
    address: { street: string; number: string; neighborhood: string; reference: string }
    subtotal: number
    deliveryFee: number
    total: number
  }
}>()

const emit = defineEmits(['navigate'])

const orderCode = ref('#' + Math.floor(10000 + Math.random() * 90000))

const steps = [
  { key: 'confirmed', label: 'Pedido confirmado', icon: '✅' },
  { key: 'preparing', label: 'Preparando seu pedido', icon: '👨‍🍳' },
  { key: 'onTheWay', label: 'Saiu para entrega', icon: '🛵' },
  { key: 'delivered', label: 'Entregue', icon: '🎉' }
]

const pickupSteps = [
  { key: 'confirmed', label: 'Pedido confirmado', icon: '✅' },
  { key: 'preparing', label: 'Preparando seu pedido', icon: '👨‍🍳' },
  { key: 'ready', label: 'Pronto para retirada', icon: '🏬' }
]

const activeStepList = computed(() => props.order.deliveryType === 'delivery' ? steps : pickupSteps)

const currentStepIndex = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

const progressPercent = computed(() => {
  if (activeStepList.value.length <= 1) return 0
  return (currentStepIndex.value / (activeStepList.value.length - 1)) * 100
})

const isFinished = computed(() => currentStepIndex.value === activeStepList.value.length - 1)

onMounted(() => {
  interval = setInterval(() => {
    if (currentStepIndex.value < activeStepList.value.length - 1) {
      currentStepIndex.value++
    } else if (interval) {
      clearInterval(interval)
    }
  }, 4000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

const paymentLabel = computed(() => {
  const map = { pix: 'Pix', card: 'Cartão', cash: 'Dinheiro' }
  return map[props.order.paymentMethod]
})

const paymentIcon = computed(() => {
  const map = { pix: '⚡', card: '💳', cash: '💵' }
  return map[props.order.paymentMethod]
})

const estimatedTime = computed(() => props.order.deliveryType === 'delivery' ? '35-45 min' : '15-20 min')
</script>

<template>
  <div class="status-wrapper">

    <!-- HERO -->
    <div class="status-hero">
      <div class="hero-glow"></div>
      <div class="hero-content">
        <span class="status-tag">
          <span class="tag-dot" :class="{ pulsing: !isFinished }"></span>
          PEDIDO {{ orderCode }}
        </span>
        <h1 v-if="order.deliveryType === 'delivery'">Seu pedido está a caminho!</h1>
        <h1 v-else>Seu pedido está sendo preparado!</h1>
        <p class="hero-sub">
          <span class="clock-icon">⏱</span>
          Tempo estimado: <strong>{{ estimatedTime }}</strong>
        </p>
      </div>
    </div>

    <div class="status-container">

      <!-- LINHA DO TEMPO -->
      <div class="status-card timeline-card">
        <div class="card-header-row">
          <h2 class="card-title">
            {{ order.deliveryType === 'delivery' ? 'Acompanhe sua entrega' : 'Acompanhe seu pedido' }}
          </h2>
          <span class="progress-percent">{{ Math.round(progressPercent) }}%</span>
        </div>

        <div class="timeline">
          <div class="timeline-track">
            <div class="timeline-track-fill" :style="{ height: progressPercent + '%' }"></div>
          </div>

          <div
            v-for="(step, index) in activeStepList"
            :key="step.key"
            class="timeline-step"
            :class="{ done: index <= currentStepIndex, active: index === currentStepIndex }"
          >
            <div class="step-icon">
              <span class="step-icon-emoji">{{ step.icon }}</span>
              <span v-if="index === currentStepIndex && !isFinished" class="ping"></span>
            </div>
            <div class="step-text">
              <span class="step-label">{{ step.label }}</span>
              <span v-if="index === currentStepIndex && !isFinished" class="step-status">em andamento…</span>
              <span v-else-if="index < currentStepIndex || (index === currentStepIndex && isFinished)" class="step-status done-status">concluído</span>
            </div>
          </div>
        </div>
      </div>

      <!-- INFO DE RETIRADA -->
      <div v-if="order.deliveryType === 'pickup'" class="status-card">
        <h2 class="card-title">🏬 Retirar na loja</h2>

        <div class="info-block">
          <div class="info-row">
            <span class="info-label">📍 Endereço</span>
            <span class="info-value">Rua das Hamburguerias, 123 – Centro</span>
          </div>
          <div class="info-row">
            <span class="info-label">🕒 Horário</span>
            <span class="info-value">Seg a Dom, 18h às 23h</span>
          </div>
        </div>

        <div class="pickup-code-box">
          <span class="pickup-code-label">Código de retirada</span>
          <span class="pickup-code-value">{{ orderCode }}</span>
        </div>
        <p class="hint">Apresente esse código no balcão para retirar seu pedido.</p>
      </div>

      <!-- INFO DE ENTREGA -->
      <div v-else class="status-card">
        <h2 class="card-title">📍 Endereço de entrega</h2>
        <div class="info-block">
          <div class="info-row">
            <span class="info-label">Local</span>
            <span class="info-value">{{ order.address.street }}, {{ order.address.number }} – {{ order.address.neighborhood }}</span>
          </div>
          <div v-if="order.address.reference" class="info-row">
            <span class="info-label">Referência</span>
            <span class="info-value">{{ order.address.reference }}</span>
          </div>
        </div>
      </div>

      <!-- RESUMO DO PEDIDO -->
      <div class="status-card">
        <h2 class="card-title">🧾 Resumo do pedido</h2>

        <div class="summary-items">
          <div v-for="item in order.items" :key="item.id" class="summary-item">
            <span class="item-qty">{{ item.quantity }}x</span>
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">R$ {{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <div class="summary-divider"></div>

        <div class="info-row payment-row">
          <span class="info-label">{{ paymentIcon }} Pagamento</span>
          <span class="info-value">{{ paymentLabel }}</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-total">
          <span>Total pago</span>
          <span class="total-amount">R$ {{ order.total.toFixed(2) }}</span>
        </div>
      </div>

      <button class="btn-back" @click="emit('navigate', 'home')">
        ← Voltar para o início
      </button>

    </div>
  </div>
</template>

<style scoped>
.status-wrapper {
  --bg: #120d0a;
  --surface: #1b1512;
  --surface-alt: #241c17;
  --border: #33291f;
  --accent: #f5b700;
  --accent-2: #e2542d;
  --text: #f7f1e8;
  --text-muted: #ab9d8d;
  --green: #4ade80;

  background-color: var(--bg);
  min-height: 100vh;
  width: 100%;
  color: var(--text);
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
}

/* HERO */
.status-hero {
  position: relative;
  text-align: center;
  padding: 60px 20px 52px;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 480px;
  height: 320px;
  background: radial-gradient(circle, rgba(245, 183, 0, 0.22) 0%, rgba(245, 183, 0, 0) 70%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(245, 183, 0, 0.12);
  color: var(--accent);
  border: 1px solid rgba(245, 183, 0, 0.35);
  font-weight: 800;
  font-size: 0.72rem;
  padding: 7px 16px 7px 12px;
  border-radius: 20px;
  letter-spacing: 1.2px;
}

.tag-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.tag-dot.pulsing {
  animation: dotPulse 1.4s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

.status-hero h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.7rem, 3.6vw, 2.3rem);
  font-weight: 600;
  margin: 18px 0 10px;
}

.hero-sub {
  color: var(--text-muted);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.hero-sub strong {
  color: var(--text);
}

.clock-icon {
  font-size: 0.9rem;
}

/* CONTAINER */
.status-container {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 20px 70px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.status-card {
  background: linear-gradient(180deg, var(--surface) 0%, #180f0b 100%);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.card-title {
  font-family: 'Fraunces', serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 22px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.timeline-card .card-title {
  margin-bottom: 0;
}

.progress-percent {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--accent);
  background: rgba(245, 183, 0, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
}

/* TIMELINE */
.timeline {
  position: relative;
  padding-left: 4px;
}

.timeline-track {
  position: absolute;
  left: 23px;
  top: 20px;
  bottom: 20px;
  width: 2px;
  background: var(--border);
  border-radius: 2px;
}

.timeline-track-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
  border-radius: 2px;
  transition: height 0.6s ease;
}

.timeline-step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  padding: 14px 0;
}

.step-icon {
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--surface-alt);
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 2;
  opacity: 0.4;
  transition: all 0.4s ease;
}

.step-icon-emoji {
  font-size: 1.15rem;
}

.timeline-step.done .step-icon {
  border-color: var(--accent);
  background: linear-gradient(145deg, rgba(245, 183, 0, 0.22), rgba(226, 84, 45, 0.12));
  opacity: 1;
  box-shadow: 0 0 0 4px rgba(245, 183, 0, 0.08);
}

.ping {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  animation: pingRing 1.6s ease-out infinite;
}

@keyframes pingRing {
  0% { transform: scale(0.85); opacity: 0.8; }
  100% { transform: scale(1.35); opacity: 0; }
}

.step-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-top: 10px;
}

.step-label {
  font-weight: 700;
  font-size: 0.94rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.timeline-step.done .step-label {
  color: var(--text);
}

.timeline-step.active .step-label {
  color: var(--accent);
}

.step-status {
  font-size: 0.74rem;
  color: var(--accent);
  font-weight: 700;
}

.step-status.done-status {
  color: var(--green);
}

/* INFO BLOCKS */
.info-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  font-size: 0.88rem;
  padding: 10px 0;
  border-bottom: 1px solid rgba(51, 41, 31, 0.6);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  color: var(--text-muted);
  flex-shrink: 0;
  font-weight: 600;
}

.info-value {
  color: var(--text);
  text-align: right;
  font-weight: 600;
}

.payment-row {
  padding: 8px 0;
}

/* PICKUP CODE */
.pickup-code-box {
  margin-top: 16px;
  background: linear-gradient(135deg, rgba(245, 183, 0, 0.14), rgba(226, 84, 45, 0.08));
  border: 1px dashed rgba(245, 183, 0, 0.4);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pickup-code-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pickup-code-value {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 2px;
}

.hint {
  margin-top: 12px;
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* RESUMO */
.summary-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  padding: 7px 0;
}

.item-qty {
  color: var(--accent);
  font-weight: 800;
  flex-shrink: 0;
}

.item-name {
  color: var(--text);
  flex: 1;
}

.item-price {
  color: var(--text-muted);
  font-weight: 600;
}

.summary-divider {
  height: 1px;
  background: var(--border);
  margin: 14px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 800;
  font-size: 1.02rem;
  color: var(--text);
}

.total-amount {
  color: var(--accent);
  font-size: 1.5rem;
  font-family: 'Fraunces', serif;
}

/* BOTÃO */
.btn-back {
  width: 100%;
  background: var(--surface-alt);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 15px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-back:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}
</style>