<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  drift: number;
}

const snowflakes: Snowflake[] = [];
const snowflakeCount = 150;

const createSnowflake = (canvas: HTMLCanvasElement): Snowflake => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 3 + 1,
  speed: Math.random() * 1 + 0.5,
  opacity: Math.random() * 0.5 + 0.3,
  drift: Math.random() * 1 - 0.5,
});

const drawSnowflakes = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  snowflakes.forEach((flake) => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
    ctx.fill();
    
    // Update position
    flake.y += flake.speed;
    flake.x += flake.drift;

    // Reset if out of bounds
    if (flake.y > canvas.height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width;
    }
    if (flake.x > canvas.width) {
      flake.x = 0;
    } else if (flake.x < 0) {
      flake.x = canvas.width;
    }
  });
};

const animate = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  drawSnowflakes(ctx, canvas);
  animationFrameId = requestAnimationFrame(() => animate(ctx, canvas));
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resize);
  resize();

  // Initialize snowflakes
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 50 : snowflakeCount;

  for (let i = 0; i < count; i++) {
    snowflakes.push(createSnowflake(canvas));
  }

  animate(ctx, canvas);

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
    cancelAnimationFrame(animationFrameId);
  });
});
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0 pointer-events-none z-50"></canvas>
</template>
