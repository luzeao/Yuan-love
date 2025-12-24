<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  onClose: Function
});

const score = ref(0);
const timeLeft = ref(30);
const isPlaying = ref(false);
const isGameOver = ref(false);
const gameContainer = ref(null);
const items = ref([]);
let gameLoopId;
let spawnIntervalId;
let timerIntervalId;

const objects = [
  { emoji: '💖', type: 'good', points: 10 },
  { emoji: '💌', type: 'good', points: 20 },
  { emoji: '💍', type: 'good', points: 50 },
  { emoji: '💔', type: 'bad', points: -20 },
];

const startGame = () => {
  score.value = 0;
  timeLeft.value = 30;
  items.value = [];
  isPlaying.value = true;
  isGameOver.value = false;

  // Timer
  timerIntervalId = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      endGame();
    }
  }, 1000);

  // Spawner
  spawnIntervalId = setInterval(spawnItem, 600);

  // Game Loop for movement
  gameLoop();
};

const endGame = () => {
  isPlaying.value = false;
  isGameOver.value = true;
  clearInterval(timerIntervalId);
  clearInterval(spawnIntervalId);
  cancelAnimationFrame(gameLoopId);
};

const spawnItem = () => {
  if (!gameContainer.value) return;
  
  const width = gameContainer.value.clientWidth;
  const type = objects[Math.random() > 0.8 ? 3 : Math.floor(Math.random() * 3)]; // 20% chance of bad item
  
  const item = {
    id: Date.now() + Math.random(),
    x: Math.random() * (width - 60), // Keep within bounds
    y: -50,
    speed: Math.random() * 2 + 2,
    ...type
  };
  
  items.value.push(item);
};

const gameLoop = () => {
  if (!isPlaying.value) return;

  // Update positions
  items.value.forEach(item => {
    item.y += item.speed;
  });

  // Remove items that fell off screen
  if (gameContainer.value) {
    const height = gameContainer.value.clientHeight;
    items.value = items.value.filter(item => item.y < height);
  }

  gameLoopId = requestAnimationFrame(gameLoop);
};

const handleItemClick = (item) => {
  if (!isPlaying.value) return;

  // Add/Sub score
  score.value += item.points;
  
  // Show floaty text effect (simplified by just removing item for now)
  const index = items.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    items.value.splice(index, 1);
  }
  
  // Haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(item.type === 'good' ? 10 : 50);
  }
};

onMounted(() => {
  // Auto start
  // startGame(); 
});

onUnmounted(() => {
  endGame();
});
</script>

<template>
  <div class="relative w-full h-full flex flex-col overflow-hidden bg-bg/50">
    <!-- HUD -->
    <div class="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pointer-events-none">
      <div class="bg-surface/80 backdrop-blur rounded-full px-4 py-1 border border-primary/30 text-primary font-bold">
        Score: {{ score }}
      </div>
      <div class="bg-surface/80 backdrop-blur rounded-full px-4 py-1 border border-primary/30 font-bold" :class="timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-text'">
        Time: {{ timeLeft }}s
      </div>
    </div>

    <!-- Game Area -->
    <div ref="gameContainer" class="relative flex-1 w-full overflow-hidden">
      <!-- Start Screen -->
      <div v-if="!isPlaying && !isGameOver" class="absolute inset-0 flex flex-col items-center justify-center z-20">
        <h3 class="text-3xl font-display text-primary mb-2">Love Catcher</h3>
        <p class="text-text/70 mb-8 text-center px-6">Catch the falling gifts of love!<br>Avoid the broken hearts 💔</p>
        <button 
          @click="startGame"
          class="px-8 py-3 bg-primary text-bg font-bold rounded-full text-xl shadow-lg hover:scale-105 transition-transform active:scale-95"
        >
          Start Game
        </button>
      </div>

      <!-- Falling Items -->
      <div 
        v-for="item in items" 
        :key="item.id"
        class="absolute w-12 h-12 flex items-center justify-center text-4xl cursor-pointer select-none touch-manipulation active:scale-150 transition-transform"
        :style="{ transform: `translate(${item.x}px, ${item.y}px)` }"
        @mousedown="handleItemClick(item)"
        @touchstart.prevent="handleItemClick(item)"
      >
        {{ item.emoji }}
      </div>

      <!-- Game Over Screen -->
      <div v-if="isGameOver" class="absolute inset-0 z-30 flex items-center justify-center bg-bg/80 backdrop-blur-sm animate-fade-in">
        <div class="text-center p-8 bg-surface border border-primary/50 rounded-2xl shadow-2xl max-w-sm mx-4 transform animate-scale-in">
          <h2 class="text-3xl font-display text-primary mb-2">Time's Up!</h2>
          <div class="text-5xl font-bold text-text mb-4">{{ score }} pts</div>
          <p class="text-text/80 mb-6 italic">
            <span v-if="score > 500">Wow! Your love is overflowing! 🌊</span>
            <span v-else-if="score > 200">Great job! So much love! ❤️</span>
            <span v-else>Keep trying, love takes practice! 😉</span>
          </p>
          <div class="flex gap-4 justify-center">
            <button 
              @click="startGame"
              class="px-6 py-2 bg-primary text-bg font-bold rounded-full hover:bg-primary/80 transition-colors shadow-lg"
            >
              Retry
            </button>
            <button 
              @click="onClose"
              class="px-6 py-2 border border-primary text-primary font-bold rounded-full hover:bg-primary/10 transition-colors"
            >
              Close
            </button>
          </div>
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

@keyframes scale-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-scale-in {
  animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
