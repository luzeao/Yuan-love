<script setup lang="ts">
import { useTheme } from '../composables/useTheme';

const { themes, currentTheme, setTheme } = useTheme();
</script>

<template>
  <div class="fixed z-50 flex items-center gap-4 md:flex-col md:gap-6 
              left-1/2 -translate-x-1/2 bottom-6 flex-row
              md:left-auto md:translate-x-0 md:right-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto
              pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]">
    
    <!-- Vertical Line (Desktop) / Horizontal Line (Mobile) -->
    <div class="hidden md:block w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
    <div class="block md:hidden h-[1px] w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    
    <button
      v-for="theme in themes"
      :key="theme.id"
      class="w-4 h-4 md:w-4 md:h-4 rounded-full transition-all duration-500 relative group touch-manipulation"
      @click="setTheme(theme.id)"
      aria-label="Switch theme"
    >
      <span 
        class="absolute inset-0 rounded-full opacity-50 transition-transform duration-300 group-hover:scale-150"
        :style="{ backgroundColor: `rgb(${theme.colors.primary})` }"
      ></span>
      
      <span 
        class="absolute inset-0 rounded-full transition-all duration-500"
        :class="currentTheme.id === theme.id ? 'scale-100' : 'scale-0'"
        :style="{ backgroundColor: `rgb(${theme.colors.primary})`, boxShadow: `0 0 10px rgb(${theme.colors.primary})` }"
      ></span>
    </button>
    
    <div class="hidden md:block w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
    <div class="block md:hidden h-[1px] w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
  </div>
</template>
