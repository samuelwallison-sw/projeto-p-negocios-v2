<script setup lang="ts">
const values = [
  { icon: '🥩', title: 'Ingredientes selecionados', desc: 'Carne 100% bovina moída diariamente e insumos escolhidos a dedo.' },
  { icon: '👨‍🍳', title: 'Receitas artesanais', desc: 'Molhos e blends desenvolvidos na nossa cozinha, sem atalhos.' },
  { icon: '🛵', title: 'Entrega ágil', desc: 'Pedido rastreável, do preparo até a sua porta em até 40 minutos.' },
  { icon: '🌱', title: 'Opções para todos', desc: 'Também temos opções veggie para quem prefere lanches sem carne.' },
]

const stats = [
  { value: '4.8★', label: 'Avaliação média' },
  { value: '50 mil+', label: 'Pedidos entregues' },
  { value: '40 min', label: 'Tempo médio de entrega' },
]
</script>

<template>
  <div class="sobre-wrapper">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-tag">SOBRE O APP</span>
        <h1>A história por trás do Burguer Zap</h1>
        <p>Feito por quem ama hambúrguer, pra quem também ama.</p>
      </div>
    </div>

    <div class="page">
      <section class="intro-card">
        <p>
          O Burguer Zap nasceu da vontade de levar hambúrgueres artesanais de verdade
          até a porta da sua casa, sem complicação. Cada lanche é montado na hora,
          com carne 100% bovina moída diariamente e molhos feitos na nossa cozinha.
        </p>
        <p>
          Hoje entregamos em toda a cidade com um único objetivo: que cada mordida
          tenha o mesmo sabor de quem comeu no balcão da loja.
        </p>
      </section>

      <div class="stats-grid">
        <div v-for="(stat, i) in stats" :key="i" class="stat-card">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>

      <section class="values-section">
        <h2>O que nos move</h2>
        <div class="values-grid">
          <div v-for="(v, i) in values" :key="i" class="value-card">
            <span class="value-icon">{{ v.icon }}</span>
            <div>
              <h3>{{ v.title }}</h3>
              <p>{{ v.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.sobre-wrapper {
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
  background-image: url('https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&auto=format&fit=crop&q=80');
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
  max-width: 900px;
  margin: -56px auto 0;
  padding: 0 20px 70px;
  position: relative;
  z-index: 10;
}

.intro-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 28px;
  margin-bottom: 24px;
}

.intro-card p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin: 0 0 14px;
}

.intro-card p:last-child {
  margin-bottom: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}

.stat-card {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px;
  text-align: center;
}

.stat-value {
  display: block;
  font-family: 'Fraunces', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
}

.values-section h2 {
  font-family: 'Fraunces', serif;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 20px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.value-card {
  display: flex;
  gap: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
}

.value-icon {
  flex-shrink: 0;
  font-size: 1.6rem;
}

.value-card h3 {
  font-size: 0.98rem;
  font-weight: 800;
  margin: 0 0 6px;
  color: var(--text);
}

.value-card p {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 0;
}
</style>