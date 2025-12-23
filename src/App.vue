<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from './composables/useTheme';
import MusicPlayer from './components/MusicPlayer.vue';

const { initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div class="min-h-screen bg-bg text-text selection:bg-primary selection:text-bg transition-colors duration-700 relative">
    <MusicPlayer />
    
     <!-- Background Grid Effect -->
    <div class="fixed inset-0 pointer-events-none z-0 opacity-10"
         style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
         linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
         background-size: 50px 50px;">
    </div>
    
    <!-- Ambient Glow -->
    <div class="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
    <div class="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" style="animation-delay: 2s;"></div>

    <!-- Main Content -->
    <div class="relative z-10">
      <router-view />
    </div>
  </div>
</template>

<style>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.1); }
}
.animate-pulse-slow {
  animation: pulse-slow 8s infinite ease-in-out;
}
</style>
