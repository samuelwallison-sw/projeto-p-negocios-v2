<script setup lang="ts">
import { ref } from 'vue'

const faqs = ref([
  {
    q: 'Quanto tempo demora a entrega?',
    a: 'O prazo médio é de até 40 minutos, podendo variar de acordo com a distância e o volume de pedidos no momento.',
    open: false,
  },
  {
    q: 'Posso remover ingredientes do meu lanche?',
    a: 'Sim! Na tela do cardápio, clique em "Personalizar & ver alergênicos" em qualquer produto para desmarcar o que não quiser.',
    open: false,
  },
  {
    q: 'Quais formas de pagamento vocês aceitam?',
    a: 'Aceitamos Pix, cartão de crédito/débito na entrega e dinheiro.',
    open: false,
  },
  {
    q: 'Como acompanho o status do meu pedido?',
    a: 'Assim que o pedido é confirmado, você recebe atualizações pelo WhatsApp informado no cadastro.',
    open: false,
  },
])

const toggleFaq = (index: number) => {
  faqs.value[index].open = !faqs.value[index].open
}

const contactChannels = [
  { icon: '💬', title: 'WhatsApp', desc: 'Resposta em poucos minutos', action: '(00) 00000-0000' },
  { icon: '✉️', title: 'E-mail', desc: 'Para dúvidas gerais', action: 'contato@burguerzap.com' },
  { icon: '📍', title: 'Loja física', desc: 'Retirada no balcão', action: 'Rua das Brasas, 123' },
]
</script>

<template>
  <div class="suporte-wrapper">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-tag">SUPORTE</span>
        <h1>Como podemos ajudar?</h1>
        <p>Tire suas dúvidas ou fale direto com a nossa equipe.</p>
      </div>
    </div>

    <div class="page">
      <div class="contact-grid">
        <div v-for="(c, i) in contactChannels" :key="i" class="contact-card">
          <span class="contact-icon">{{ c.icon }}</span>
          <h3>{{ c.title }}</h3>
          <p class="contact-desc">{{ c.desc }}</p>
          <span class="contact-action">{{ c.action }}</span>
        </div>
      </div>

      <section class="faq-section">
        <h2>Perguntas frequentes</h2>
        <div class="faq-list">
          <div
            v-for="(item, i) in faqs"
            :key="i"
            class="faq-item"
            :class="{ open: item.open }"
          >
            <button type="button" class="faq-question" @click="toggleFaq(i)">
              <span>{{ item.q }}</span>
              <span class="faq-icon">{{ item.open ? '−' : '+' }}</span>
            </button>
            <div v-if="item.open" class="faq-answer">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.suporte-wrapper {
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

.hero-section {
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  padding: 64px 20px 96px;
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

.hero-section h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  font-weight: 600;
  margin: 18px 0 10px;
}

.hero-section p {
  color: var(--text-muted);
  font-size: 1rem;
}

.page {
  max-width: 820px;
  margin: -56px auto 0;
  padding: 0 20px 70px;
  position: relative;
  z-index: 10;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 44px;
}

.contact-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px;
  text-align: center;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.contact-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.contact-icon {
  display: block;
  font-size: 1.6rem;
  margin-bottom: 10px;
}

.contact-card h3 {
  font-size: 0.98rem;
  font-weight: 800;
  margin: 0 0 4px;
  color: var(--text);
}

.contact-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0 0 10px;
}

.contact-action {
  display: inline-block;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent);
}

.faq-section h2 {
  font-family: 'Fraunces', serif;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 18px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.faq-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.faq-item.open {
  border-color: var(--accent);
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  color: var(--text);
  font-weight: 700;
  font-size: 0.9rem;
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-align: left;
}

.faq-icon {
  color: var(--accent);
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-left: 12px;
}

.faq-answer {
  padding: 0 18px 16px;
}

.faq-answer p {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}
</style>