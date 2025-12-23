<script setup lang="ts">
import { ref, onMounted } from 'vue';
import musicFile from '@/assets/M800001auUcH4WQs2V.mp3';

const audioRef = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const isUserInteracted = ref(false);

const togglePlay = () => {
  if (!audioRef.value) return;

  if (isPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play().catch(e => console.log('Playback prevented:', e));
  }
  isPlaying.value = !isPlaying.value;
  isUserInteracted.value = true;
};

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = 0.5; // Set reasonable default volume
    
    // Try auto-play
    const playPromise = audioRef.value.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying.value = true;
      }).catch(() => {
        // Auto-play was prevented
        isPlaying.value = false;
      });
    }
  }

  // Add global click listener to start music on first interaction if not playing
  const startAudioOnInteraction = () => {
    if (!isUserInteracted.value && audioRef.value && !isPlaying.value) {
      audioRef.value.play().then(() => {
        isPlaying.value = true;
        isUserInteracted.value = true;
      }).catch(() => {});
    }
    // Remove listener after first interaction
    if (isPlaying.value) {
      window.removeEventListener('click', startAudioOnInteraction);
    }
  };

  window.addEventListener('click', startAudioOnInteraction, { once: true });
});
</script>

<template>
  <div class="fixed top-6 right-6 z-50 pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)]">
    <audio ref="audioRef" :src="musicFile" loop preload="auto"></audio>
    
    <button 
      @click="togglePlay"
      class="group relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-surface/50 backdrop-blur border border-white/20 hover:border-primary/50 transition-all duration-300 overflow-hidden"
      :class="{ 'animate-spin-slow': isPlaying }"
      title="Background Music"
    >
      <!-- Vinyl Record Effect -->
      <div class="absolute inset-1 rounded-full border border-white/10 opacity-50"></div>
      <div class="absolute inset-3 rounded-full border border-white/10 opacity-50"></div>
      
      <!-- Icon -->
      <div class="relative z-10 text-primary transition-transform duration-300" :class="{ 'scale-90': !isPlaying }">
        <span v-if="!isPlaying" class="text-xs md:text-sm">♪</span>
        <div v-else class="flex gap-[2px] items-end h-3">
          <span class="w-[2px] bg-primary animate-music-bar h-2" style="animation-delay: 0s"></span>
          <span class="w-[2px] bg-primary animate-music-bar h-3" style="animation-delay: 0.1s"></span>
          <span class="w-[2px] bg-primary animate-music-bar h-1" style="animation-delay: 0.2s"></span>
        </div>
      </div>

      <!-- Glow Effect -->
      <div class="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </button>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

@keyframes music-bar {
  0%, 100% { height: 20%; }
  50% { height: 100%; }
}

.animate-music-bar {
  animation: music-bar 0.8s ease-in-out infinite;
}
</style>
