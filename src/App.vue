<script setup>
import TheHeader from './components/TheHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesMarquee from './components/ServicesMarquee.vue'
import MethodSection from './components/MethodSection.vue'
import AdvantagesSection from './components/AdvantagesSection.vue'
import IncludedSection from './components/IncludedSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import AutomationSection from './components/AutomationSection.vue'
import FaqSection from './components/FaqSection.vue'
import StudioNote from './components/StudioNote.vue'
import ContactSection from './components/ContactSection.vue'
import CookiesSection from './components/CookiesSection.vue'
import TheFooter from './components/TheFooter.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import CookieBanner from './components/CookieBanner.vue'
import ProjectModal from './components/ProjectModal.vue'
</script>

<template>
  <TheHeader />
  <main id="contenu">
    <HeroSection />
    <ServicesMarquee />
    <MethodSection />
    <AdvantagesSection />
    <IncludedSection />
    <PortfolioSection />
    <AutomationSection />
    <FaqSection />
    <StudioNote />
    <ContactSection />
    <CookiesSection />
  </main>
  <TheFooter />

  <WhatsAppButton />
  <ProjectModal />
  <CookieBanner />
</template>
