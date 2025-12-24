<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  onClose: Function
});

const cards = ref([]);
const flippedCards = ref([]);
const matchedPairs = ref([]);
const moves = ref(0);
const isGameWon = ref(false);

const emojis = ['🌹', '💍', '🧸', '💌', '🎁', '🎵', '📷', '🌙'];

const shuffleCards = () => {
  const pairs = [...emojis, ...emojis];
  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  
  cards.value = pairs.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false
  }));
  
  flippedCards.value = [];
  matchedPairs.value = [];
  moves.value = 0;
  isGameWon.value = false;
};

const handleCardClick = (card) => {
  // Prevent clicking if already matched, already flipped, or 2 cards already flipped
  if (card.isMatched || card.isFlipped || flippedCards.value.length >= 2) return;

  // Flip the card
  card.isFlipped = true;
  flippedCards.value.push(card);

  // Check match if 2 cards are flipped
  if (flippedCards.value.length === 2) {
    moves.value++;
    const [card1, card2] = flippedCards.value;

    if (card1.emoji === card2.emoji) {
      // Match found
      card1.isMatched = true;
      card2.isMatched = true;
      matchedPairs.value.push(card1.emoji);
      flippedCards.value = [];

      // Check win
      if (matchedPairs.value.length === emojis.length) {
        setTimeout(() => {
          isGameWon.value = true;
        }, 500);
      }
    } else {
      // No match - flip back after delay
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
        flippedCards.value = [];
      }, 1000);
    }
  }
};

onMounted(() => {
  shuffleCards();
});
</script>

<template>
  <div class="flex flex-col h-full items-center justify-center p-4">
    <!-- Header -->
    <div class="text-center mb-6">
      <h3 class="text-2xl font-serif text-primary mb-2">Sweet Memories</h3>
      <p class="text-text/70 text-sm">Moves: {{ moves }} | Pairs: {{ matchedPairs.length }}/{{ emojis.length }}</p>
    </div>

    <!-- Game Grid -->
    <div class="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-[400px] aspect-square">
      <div 
        v-for="card in cards" 
        :key="card.id"
        class="relative w-full h-full cursor-pointer perspective-1000 touch-manipulation"
        @click="handleCardClick(card)"
      >
        <div 
          class="w-full h-full transition-all duration-500 transform preserve-3d shadow-lg rounded-xl"
          :class="[card.isFlipped || card.isMatched ? 'rotate-y-180' : '']"
        >
          <!-- Front (Hidden) -->
          <div class="absolute inset-0 bg-surface border-2 border-primary/30 rounded-xl flex items-center justify-center backface-hidden group hover:border-primary/60 transition-colors">
            <span class="text-2xl opacity-50">?</span>
          </div>
          
          <!-- Back (Revealed) -->
          <div class="absolute inset-0 bg-primary/10 border-2 border-primary rounded-xl flex items-center justify-center backface-hidden rotate-y-180">
            <span class="text-3xl md:text-4xl filter drop-shadow-md select-none">{{ card.emoji }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Win State -->
    <div v-if="isGameWon" class="absolute inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm animate-fade-in">
      <div class="text-center p-8 bg-surface border border-primary/50 rounded-2xl shadow-2xl max-w-sm mx-4 transform animate-scale-in">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-3xl font-display text-primary mb-4">Perfect Match!</h2>
        <p class="text-text/80 mb-6">You found all the memories in {{ moves }} moves.</p>
        <div class="flex gap-4 justify-center">
          <button 
            @click="shuffleCards"
            class="px-6 py-2 bg-primary text-bg font-bold rounded-full hover:bg-primary/80 transition-colors shadow-lg"
          >
            Play Again
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
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

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
