<script setup lang="ts">
const updates = [
  {
    date: '20 Ago 2026',
    tag: 'Novo produto',
    title: 'Chegou o Smash Duplo Especial',
    desc: 'Dois blends smash 90g, cheddar cremoso em dobro e cebola caramelizada. Já disponível no cardápio.',
    icon: '🍔',
  },
  {
    date: '14 Ago 2026',
    tag: 'Promoção',
    title: 'Frete grátis nas compras acima de R$ 50',
    desc: 'Válido para toda a semana em pedidos feitos direto pelo app, sem cupom.',
    icon: '🚀',
  },
  {
    date: '05 Ago 2026',
    tag: 'Melhoria',
    title: 'Personalize ingredientes no seu lanche',
    desc: 'Agora você pode remover ingredientes de qualquer produto direto na tela do cardápio.',
    icon: '🥗',
  },
  {
    date: '28 Jul 2026',
    tag: 'Novo produto',
    title: 'Linha de sobremesas gelada',
    desc: 'Milkshake de Ovomaltine e Sundae de Morango entraram para o cardápio.',
    icon: '🍦',
  },
]
</script>

<template>
  <div class="novidades-wrapper">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-tag">NOVIDADES</span>
        <h1>Fique por dentro do que está rolando</h1>
        <p>Lançamentos, promoções e melhorias direto do Burguer Zap.</p>
      </div>
    </div>

    <div class="page">
      <div class="timeline">
        <article v-for="(item, i) in updates" :key="i" class="update-card">
          <div class="update-icon">{{ item.icon }}</div>
          <div class="update-body">
            <div class="update-meta">
              <span class="update-tag">{{ item.tag }}</span>
              <span class="update-date">{{ item.date }}</span>
            </div>
            <h3 class="update-title">{{ item.title }}</h3>
            <p class="update-desc">{{ item.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.novidades-wrapper {
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
  background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=80');
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
  max-width: 760px;
  margin: -56px auto 0;
  padding: 0 20px 70px;
  position: relative;
  z-index: 10;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.update-card {
  display: flex;
  gap: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.update-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.update-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--surface-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.update-body {
  flex: 1;
}

.update-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.update-tag {
  background: rgba(245, 183, 0, 0.14);
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.4px;
}

.update-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.update-title {
  font-size: 1.05rem;
  font-weight: 800;
  margin: 0 0 6px;
  color: var(--text);
}

.update-desc {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 0;
}
</style>