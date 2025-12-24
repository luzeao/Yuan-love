<script setup>
import { ref } from 'vue';
import { Gamepad2, X } from 'lucide-vue-next';
import MemoryGame from './games/MemoryGame.vue';

const isOpen = ref(false);
const showGame = ref(false);

const toggleGame = () => {
  showGame.value = !showGame.value;
  isOpen.value = false;
};

const closeGame = () => {
  showGame.value = false;
};
</script>

<template>
  <div>
    <!-- Floating Action Button -->
    <button 
      @click="toggleGame"
      class="fixed bottom-6 left-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface/80 backdrop-blur border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(var(--color-primary),0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(var(--color-primary),0.5)] transition-all duration-300 group pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]"
      aria-label="Sweet Memories Game"
    >
      <Gamepad2 class="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform" />
      
      <!-- Tooltip -->
      <span class="absolute left-full ml-3 px-2 py-1 bg-surface border border-primary/20 rounded text-xs text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
        Play Game
      </span>
    </button>

    <!-- Active Game Modal -->
    <div v-if="showGame" class="fixed inset-0 z-[60] flex items-center justify-center bg-bg/95 backdrop-blur-md animate-fade-in">
      <div class="relative w-full h-full md:w-[800px] md:h-[600px] md:rounded-2xl md:border md:border-primary/20 md:bg-surface/30 md:shadow-2xl overflow-hidden flex flex-col">
        <!-- Close Button (Top Right) -->
        <button 
          @click="closeGame"
          class="absolute top-4 right-4 z-50 p-2 rounded-full bg-surface/50 text-text/70 hover:text-primary hover:bg-surface border border-transparent hover:border-primary/30 transition-all"
        >
          <X class="w-6 h-6" />
        </button>

        <!-- Game Component -->
        <div class="flex-1 w-full h-full">
          <MemoryGame :onClose="closeGame" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
