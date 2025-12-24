<script setup>
import { onMounted, onUnmounted } from 'vue';

const hearts = [];

const createHeart = (x, y) => {
  const heart = document.createElement('div');
  heart.innerHTML = '❤';
  heart.className = 'heart-particle';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${Math.random() * 20 + 10}px`;
  heart.style.animationDuration = `${Math.random() * 1 + 1}s`;
  
  // Random color from pink/red palette
  const colors = ['#ffb6c1', '#ff69b4', '#dc143c', '#ff1493'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 2000);
};

const handleClick = (e) => {
  // Create a burst of hearts
  for (let i = 0; i < 5; i++) {
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;
    createHeart(e.clientX + offsetX, e.clientY + offsetY);
  }
};

onMounted(() => {
  window.addEventListener('click', handleClick);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClick);
});
</script>

<template>
  <!-- This component doesn't render anything visible itself, just effects -->
  <div style="display: none;"></div>
</template>

<style>
.heart-particle {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  animation: floatUp ease-out forwards;
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -150px) scale(1.5);
  }
}
</style>
