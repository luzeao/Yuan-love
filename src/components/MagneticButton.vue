<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const btnRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

const handleMouseMove = (e: MouseEvent) => {
  if (!btnRef.value) return;

  const rect = btnRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  // Magnetic effect strength
  gsap.to(btnRef.value, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: 'power2.out',
  });

  // Text moves slightly more for depth effect
  if (textRef.value) {
    gsap.to(textRef.value, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
};

const handleMouseLeave = () => {
  if (!btnRef.value) return;

  gsap.to([btnRef.value, textRef.value], {
    x: 0,
    y: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.3)',
  });
};
</script>

<template>
  <button
    ref="btnRef"
    class="relative inline-block px-10 py-5 bg-surface/50 border border-primary/30 backdrop-blur-sm text-primary uppercase tracking-[0.2em] text-xs font-bold overflow-hidden group"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Background Hover Fill -->
    <div class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    
    <!-- Content -->
    <span ref="textRef" class="relative z-10 block pointer-events-none">
      <slot>Button</slot>
    </span>
    
    <!-- Corner Accents -->
    <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
    <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
  </button>
</template>
