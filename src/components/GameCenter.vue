<script setup>
import { ref } from 'vue';
import { Gamepad2, X } from 'lucide-vue-next';
import MemoryGame from './games/MemoryGame.vue';
import LoveCatcher from './games/LoveCatcher.vue';

const isOpen = ref(false);
const activeGame = ref(null); // 'memory' | 'catcher' | null

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    activeGame.value = null;
  }
};

const selectGame = (game) => {
  activeGame.value = game;
  isOpen.value = false; // Close menu, open modal
};

const closeGame = () => {
  activeGame.value = null;
};
</script>

<template>
  <div>
    <!-- Floating Action Button -->
    <button 
      @click="toggleMenu"
      class="fixed bottom-6 left-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface/80 backdrop-blur border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(var(--color-primary),0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(var(--color-primary),0.5)] transition-all duration-300 group pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]"
      aria-label="Game Center"
    >
      <Gamepad2 class="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform" />
      
      <!-- Tooltip -->
      <span class="absolute left-full ml-3 px-2 py-1 bg-surface border border-primary/20 rounded text-xs text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
        Mini Games
      </span>
    </button>

    <!-- Game Menu Overlay -->
    <div v-if="isOpen && !activeGame" class="fixed inset-0 z-50 flex items-end md:items-center justify-start md:justify-center pointer-events-none">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity" @click="toggleMenu"></div>
      
      <!-- Menu Card -->
      <div class="relative pointer-events-auto bg-surface border border-primary/20 rounded-t-2xl md:rounded-2xl p-6 w-full md:w-[400px] shadow-2xl animate-slide-up md:animate-scale-in mb-0 md:mb-0">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-display text-primary">Game Center</h2>
          <button @click="toggleMenu" class="text-text/50 hover:text-primary transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <button 
            @click="selectGame('memory')"
            class="group flex items-center gap-4 p-4 rounded-xl bg-bg/50 border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
              🧩
            </div>
            <div class="text-left">
              <h3 class="font-bold text-text group-hover:text-primary transition-colors">Sweet Memories</h3>
              <p class="text-sm text-text/60">Find matching pairs of our love icons.</p>
            </div>
          </button>

          <button 
            @click="selectGame('catcher')"
            class="group flex items-center gap-4 p-4 rounded-xl bg-bg/50 border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
              🎮
            </div>
            <div class="text-left">
              <h3 class="font-bold text-text group-hover:text-primary transition-colors">Love Catcher</h3>
              <p class="text-sm text-text/60">Catch falling hearts and avoid heartbreak!</p>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Game Modal -->
    <div v-if="activeGame" class="fixed inset-0 z-[60] flex items-center justify-center bg-bg/95 backdrop-blur-md animate-fade-in">
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
          <MemoryGame v-if="activeGame === 'memory'" :onClose="closeGame" />
          <LoveCatcher v-if="activeGame === 'catcher'" :onClose="closeGame" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.md\:animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
