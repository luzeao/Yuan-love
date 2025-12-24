<script setup>
import { ref } from 'vue';
import { LayoutGrid, List } from 'lucide-vue-next';
import SnowEffect from '../components/SnowEffect.vue';
import ThemeSwitcher from '../components/ThemeSwitcher.vue';
import StoryLayout from '../components/layouts/StoryLayout.vue';
import TimelineLayout from '../components/layouts/TimelineLayout.vue';

const currentLayout = ref('story'); // 'story' | 'timeline'

const toggleLayout = () => {
  currentLayout.value = currentLayout.value === 'story' ? 'timeline' : 'story';
};
</script>

<template>
  <div class="relative w-full overflow-hidden font-serif bg-bg text-text transition-colors duration-1000">
    <SnowEffect />
    <ThemeSwitcher />

    <!-- Layout Switcher (Top Right) -->
    <button 
      @click="toggleLayout"
      class="fixed top-6 right-20 z-50 p-3 rounded-full bg-surface/50 backdrop-blur border border-primary/20 text-primary hover:bg-surface hover:scale-110 transition-all shadow-lg group"
      :title="currentLayout === 'story' ? 'Switch to Timeline' : 'Switch to Story'"
    >
      <LayoutGrid v-if="currentLayout === 'timeline'" class="w-5 h-5 group-hover:rotate-90 transition-transform" />
      <List v-else class="w-5 h-5 group-hover:scale-110 transition-transform" />
    </button>

    <!-- Dynamic Layout Component -->
    <transition name="fade" mode="out-in">
      <StoryLayout v-if="currentLayout === 'story'" />
      <TimelineLayout v-else />
    </transition>
  </div>
</template>

<style scoped>
/* Ensure smooth scrolling experience */
html {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
