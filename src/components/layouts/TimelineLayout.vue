<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Assets
import heroVideo from '@/assets/e1ea5465504fea4be804739c32bbc9f3.mp4';
import memoryVideo from '@/assets/f623193a1e8aa936db0cc92774a4649f.mp4';

// Import all JPG images from assets
const images = import.meta.glob('@/assets/*.jpg', { eager: true, query: '?url', import: 'default' });
const photoList = Object.values(images);

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // Timeline Line Animation
  gsap.from('.timeline-line', {
    scrollTrigger: {
      trigger: '.timeline-container',
      start: 'top center',
      end: 'bottom bottom',
      scrub: 1,
    },
    height: 0,
    ease: 'none'
  });

  // Timeline Items Animation
  const items = gsap.utils.toArray('.timeline-item');
  items.forEach((item, i) => {
    const isLeft = i % 2 === 0;
    
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      x: isLeft ? -100 : 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
});
</script>

<template>
  <div class="w-full min-h-screen pt-32 pb-20 px-4">
    <!-- Header -->
    <div class="text-center mb-20">
      <h1 class="text-5xl md:text-7xl font-display text-primary mb-4 tracking-widest">OUR JOURNEY</h1>
      <p class="text-xl text-text/60 italic font-serif">Every step with you is a story to tell</p>
    </div>

    <!-- Timeline Container -->
    <div class="timeline-container relative max-w-5xl mx-auto">
      <!-- Center Line -->
      <div class="timeline-line absolute left-4 md:left-1/2 top-0 w-0.5 bg-primary/30 h-full transform md:-translate-x-1/2 origin-top"></div>

      <!-- Items -->
      <div class="space-y-20 md:space-y-32">
        <div 
          v-for="(src, index) in photoList" 
          :key="index"
          class="timeline-item relative flex flex-col md:flex-row items-center gap-8 md:gap-0"
          :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''"
        >
          <!-- Content Side -->
          <div class="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
            <div class="bg-surface p-4 rounded-xl shadow-xl border border-primary/10 hover:border-primary/30 transition-colors group">
              <div class="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <img 
                  :src="src" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <p class="text-center font-serif text-text/80 italic">
                Memory #{{ index + 1 }}
              </p>
            </div>
          </div>

          <!-- Dot on Line -->
          <div class="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-bg shadow-[0_0_10px_rgba(var(--color-primary),0.5)] z-10"></div>

          <!-- Empty Side for Balance -->
          <div class="hidden md:block w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Video End -->
    <div class="mt-32 max-w-4xl mx-auto">
      <div class="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
        <video 
          class="w-full h-full object-cover"
          controls
          playsinline
        >
          <source :src="memoryVideo" type="video/mp4">
        </video>
      </div>
      <p class="text-center mt-8 text-2xl font-display text-primary">To be continued...</p>
    </div>
  </div>
</template>
