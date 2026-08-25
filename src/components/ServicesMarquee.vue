<script setup>
const services = [
  'Sites vitrines',
  'Boutiques en ligne',
  'Automatisation IA',
  'Refonte de site',
  'Référencement Google',
  'Maintenance & support',
  'Design sur mesure',
  'Casablanca & régions',
]
</script>

<template>
  <div class="bw-marquee" aria-hidden="true">
    <div class="bw-marquee__piste">
      <span class="bw-marquee__groupe" aria-hidden="true">
        <template v-for="service in services" :key="service">
          <span class="bw-marquee__mot">{{ service }}</span>
          <span class="bw-marquee__point" aria-hidden="true">✦</span>
        </template>
      </span>
      <span class="bw-marquee__groupe" aria-hidden="true">
        <template v-for="service in services" :key="`${service}-copie`">
          <span class="bw-marquee__mot">{{ service }}</span>
          <span class="bw-marquee__point" aria-hidden="true">✦</span>
        </template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.bw-marquee {
  position: relative;
  overflow: hidden;
  border-block: 1px solid var(--bw-border);
  background: var(--bw-bg-alt);
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0,
    #000 8%,
    #000 92%,
    transparent 100%
  );
  mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
}

.bw-marquee__piste {
  display: flex;
  width: max-content;
  animation: bw-defiler 34s linear infinite;
}

.bw-marquee__groupe {
  display: flex;
  align-items: center;
  flex: none;
}

.bw-marquee__mot {
  padding: 26px 0;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(1.2rem, 0.9rem + 1.1vw, 1.7rem);
  color: var(--bw-text-muted);
  white-space: nowrap;
}

.bw-marquee__point {
  margin: 0 34px;
  font-size: 0.9rem;
  color: var(--bw-purple);
}

@keyframes bw-defiler {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.bw-marquee:hover .bw-marquee__piste {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .bw-marquee__piste {
    animation: none;
  }
}
</style>
