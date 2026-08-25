<script setup lang="ts">
const emit = defineEmits(['navigate'])

const products = [
  {
    tag: 'Mais vendido',
    name: 'Cheddar Bacon',
    desc: 'Blend 180g, cheddar cremoso, bacon crocante e molho da casa.',
    price: 'R$ 29,90',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  },
  {
    tag: 'Artesanal',
    name: 'Smash Duplo',
    desc: 'Dois blends smash, queijo prato e cebola caramelizada.',
    price: 'R$ 32,90',
    img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
  },
  {
    tag: 'Oferta especial',
    name: 'Veggie Grelhado',
    desc: 'Hambúrguer de grão-de-bico, rúcula e maionese de ervas.',
    price: 'R$ 27,90',
    img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80',
  },
]

const promoCards = [
  {
    title: '💥 CÓDIGO: DUPLO30 - 30% OFF em Combos Smash!',
    sub1: '• NOVAS OFERTAS DIÁRIAS!',
    sub2: '• CÓDIGO: DUPLO30...',
    img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200&q=80',
  },
  {
    title: '🍕 PEÇA 2 COMBOS E GANHE BATATA GRÁTIS!',
    sub1: '• VÁLIDO ATÉ 18h!',
    sub2: '🍕 PEÇA 2 COMBOS...',
    img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=200&q=80',
  },
  {
    title: '🔥 CUPOM ESPECIAL: CHEDDAR20 - 20% OFF no Cheddar Bacon!',
    sub1: '• VER CARDÁPIO!',
    sub2: '🔥 CUPOM ESPECIAL: CHEDDAR...',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80',
  },
  {
    title: '🎉 COMBO FAMÍLIA COM REFRI GRÁTIS!',
    sub1: '• APROVEITE HOJE!',
    sub2: '🎉 COMBO FAMÍLIA...',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=80',
  },
  {
    title: '⚡ ENTREGA GRÁTIS EM COMPRAS ACIMA DE R$60!',
    sub1: '• FRETE ZERO!',
    sub2: '⚡ ENTREGA GRÁTIS...',
    img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=200&q=80',
  },
]
</script>

<template>
  <div class="home">
    <!-- SEÇÃO HERO -->
    <section class="hero">
      <div class="hero__bg">
        <img
          class="hero__img"
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80"
          alt="Hambúrguer artesanal"
        />
        <div class="hero__scrim" />
      </div>

      <div class="hero__content">
        <h1 class="hero__title">
          Sabor real em cada
          <span class="hero__highlight">
            mordida
            <svg class="hero__underline" viewBox="0 0 220 18" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 12 C 40 4, 90 16, 130 8 S 200 4, 218 10" />
            </svg>
          </span>.
        </h1>
        <p class="hero__subtitle">
          Hambúrgueres artesanais, ingredientes frescos e aquele cheddar cremoso inesquecível.
        </p>
        <button class="btn btn--primary" @click="emit('navigate', 'cardapio')">
          Ver cardápio completo
        </button>
      </div>

      <svg class="hero__wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,32 C 240,80 480,0 720,28 C 960,56 1200,8 1440,40 L1440,90 L0,90 Z" />
      </svg>
    </section>

    <!-- CARDS DE BENEFÍCIOS -->
    <section class="features">
      <div class="feature">
        <span class="feature__icon">🛵</span>
        <div>
          <h3 class="feature__title">Entrega expressa</h3>
          <p class="feature__desc">Seu pedido na sua porta em até 40 min</p>
        </div>
      </div>
      <div class="feature">
        <span class="feature__icon">🥩</span>
        <div>
          <h3 class="feature__title">Carne 100% bovina</h3>
          <p class="feature__desc">Melhores cortes preparados na brasa</p>
        </div>
      </div>
      <div class="feature">
        <span class="feature__icon">🧀</span>
        <div>
          <h3 class="feature__title">Melhores ingredientes</h3>
          <p class="feature__desc">Frescos e selecionados todos os dias</p>
        </div>
      </div>
    </section>

    <!-- CARROSSEL DE CARTÕES (FULL-WIDTH 100VW) -->
    <section class="promo-banner" aria-label="Promoções em destaque">
      <div class="promo-track">
        <!-- Renderizamos duas vezes a lista para o loop infinito ser contínuo e sem falhas -->
        <div
          v-for="(card, i) in [...promoCards, ...promoCards]"
          :key="i"
          class="promo-card"
          @click="emit('navigate', 'cardapio')"
        >
          <div class="promo-text">
            <h4>{{ card.title }}</h4>
            <p>{{ card.sub1 }}</p>
            <p v-if="card.sub2" class="sub2">{{ card.sub2 }}</p>
          </div>
          <img :src="card.img" :alt="card.title" />
        </div>
      </div>
    </section>

    <!-- SEÇÃO MAIS PEDIDOS -->
    <section class="menu">
      <div class="menu__header">
        <h2 class="menu__title">Mais pedidos da casa</h2>
        <p class="menu__subtitle">Os queridinhos dos nossos clientes</p>
      </div>

      <div class="menu__grid">
        <article v-for="item in products" :key="item.name" class="card">
          <div class="card__img-wrap">
            <img :src="item.img" :alt="item.name" class="card__img" />
            <span class="card__tag">{{ item.tag }}</span>
          </div>
          <div class="card__body">
            <h3 class="card__name">{{ item.name }}</h3>
            <p class="card__desc">{{ item.desc }}</p>
            <div class="card__footer">
              <span class="card__price">{{ item.price }}</span>
              <button class="btn btn--small" @click="emit('navigate', 'cardapio')">Ver mais</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.home {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  font-family: 'Manrope', system-ui, sans-serif;
  color: #201812;
  background: #fff8ec;
  border-radius: 20px;
  overflow: hidden;
}

/* HERO SECTION */
.hero {
  position: relative;
  min-height: 460px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(20, 14, 10, 0.85) 10%, rgba(20, 14, 10, 0.55) 60%, rgba(20, 14, 10, 0.3) 100%);
}

.hero__content {
  position: relative;
  z-index: 2;
  padding: 64px 40px 100px;
  width: 100%;
}

.hero__title {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: clamp(28px, 4.5vw, 46px);
  line-height: 1.15;
  color: #fff8ec;
  max-width: 560px;
  margin: 0 0 20px;
}

.hero__highlight {
  position: relative;
  display: inline-block;
  color: #f5b700;
}

.hero__underline {
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 12px;
}

.hero__underline path {
  fill: none;
  stroke: #e2542d;
  stroke-width: 5;
  stroke-linecap: round;
}

.hero__subtitle {
  color: #e7ded2;
  font-size: 16px;
  line-height: 1.6;
  max-width: 460px;
  margin: 0 0 28px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
}

.btn--primary {
  background: #f5b700;
  color: #201812;
  padding: 15px 26px;
}

.btn--primary:hover {
  background: #ffc82e;
}

.btn--small {
  background: #201812;
  color: #fff8ec;
  padding: 10px 18px;
  font-size: 13px;
}

.hero__wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  width: 100%;
  height: 60px;
  z-index: 2;
}

.hero__wave path {
  fill: #fff8ec;
}

/* FEATURES BRANCOS */
.features {
  margin: -40px 24px 0;
  position: relative;
  z-index: 3;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(32, 24, 18, 0.08);
  padding: 26px 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.feature__icon {
  font-size: 24px;
}

.feature__title {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 4px;
}

.feature__desc {
  font-size: 12px;
  color: #6b6058;
  margin: 0;
}

/* CARROSSEL ESCURO DE PONTA A PONTA (ESTILO REFERÊNCIA) */
.promo-banner {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background-color: #121212;
  padding: 28px 0;
  margin-top: 30px;
  overflow: hidden;
  box-shadow: inset 0 6px 14px rgba(0, 0, 0, 0.6);
}

.promo-track {
  display: flex;
  gap: 16px;
  width: max-content;
  animation: scroll-left 25s linear infinite;
  padding: 0 10px;
}

.promo-track:hover {
  animation-play-state: paused;
}

.promo-card {
  background: #1c1c1e;
  border: 1px solid #2c2c2e;
  border-radius: 12px;
  padding: 16px 18px;
  width: 320px;
  min-width: 320px;
  height: 115px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.promo-card:hover {
  border-color: #f5b700;
  transform: translateY(-2px);
}

.promo-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.promo-text h4 {
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.promo-text p {
  color: #98989f;
  font-size: 11px;
  margin: 0;
  font-weight: 500;
}

.promo-text .sub2 {
  color: #72727a;
  font-size: 10px;
}

.promo-card img {
  width: 65px;
  height: 65px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* MENU MAIS PEDIDOS */
.menu {
  padding: 50px 24px 36px;
  text-align: center;
}

.menu__title {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px;
}

.menu__subtitle {
  color: #6b6058;
  margin: 0 0 36px;
  font-size: 14px;
}

.menu__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  text-align: left;
}

.card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(32, 24, 18, 0.07);
}

.card__img-wrap {
  position: relative;
  height: 160px;
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #e2542d;
  color: #fff6ee;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
}

.card__body {
  padding: 16px 18px 18px;
}

.card__name {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 6px;
}

.card__desc {
  font-size: 13px;
  color: #6b6058;
  line-height: 1.5;
  margin: 0 0 14px;
  min-height: 38px;
}

.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__price {
  font-weight: 700;
  font-size: 15px;
}

@media (max-width: 760px) {
  .features {
    grid-template-columns: 1fr;
    margin: 20px 16px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .promo-track {
    animation: none;
  }
}
</style>