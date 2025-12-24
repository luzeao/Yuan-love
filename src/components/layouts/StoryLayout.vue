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

const titleRef = ref(null);
const subtitleRef = ref(null);

const handleHeroMouseMove = (e) => {
  const { clientX, clientY, currentTarget } = e;
  const { width, height } = currentTarget.getBoundingClientRect();
  
  const x = (clientX / width) - 0.5;
  const y = (clientY / height) - 0.5;
  
  gsap.to(titleRef.value, {
    x: x * 50,
    y: y * 50,
    duration: 1,
    ease: 'power2.out'
  });
  
  gsap.to(subtitleRef.value, {
    x: x * 30,
    y: y * 30,
    duration: 1,
    ease: 'power2.out'
  });
};

onMounted(() => {
  // Intro Text Animation
  const tl = gsap.timeline();
  tl.from(titleRef.value, {
    y: 50,
    opacity: 0,
    duration: 2,
    ease: 'power2.out',
    delay: 0.5
  })
  .from(subtitleRef.value, {
    y: 20,
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out',
  }, '-=1');

  // Parallax & Fade for Photos
  const photos = gsap.utils.toArray('.photo-item');
  photos.forEach((photo, i) => {
    gsap.from(photo, {
      scrollTrigger: {
        trigger: photo,
        start: 'top 90%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: (i % 3) * 0.2, // Stagger based on column index approx
    });
  });

  // Video Section Animation
  gsap.from('.memory-video', {
    scrollTrigger: {
      trigger: '.memory-section',
      start: 'top 70%',
    },
    scale: 0.9,
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out'
  });
});
</script>

<template>
  <div class="w-full">
    <!-- Hero Section with Video Background -->
    <section 
      class="h-screen h-[100dvh] relative flex flex-col justify-center items-center overflow-hidden supports-[height:100dvh]:h-[100dvh]"
      @mousemove="handleHeroMouseMove"
    >
      <video 
        class="absolute inset-0 w-full h-full object-cover opacity-60 filter brightness-75"
        autoplay 
        muted 
        loop 
        playsinline
      >
        <source :src="heroVideo" type="video/mp4">
      </video>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg"></div>

      <div class="relative z-10 text-center px-4 mix-blend-overlay">
        <h1 ref="titleRef" class="text-6xl md:text-9xl font-display tracking-widest text-white mb-6 drop-shadow-lg">
          FOREVER
        </h1>
        <p ref="subtitleRef" class="text-xl md:text-3xl text-primary font-serif italic tracking-widest opacity-90">
          Every moment with you is a treasure
        </p>
      </div>
      
      <div class="absolute bottom-10 animate-bounce text-white/50">
        ↓
      </div>
    </section>

    <!-- Romantic Text Section -->
    <section class="py-20 md:py-32 px-6 md:px-20 max-w-4xl mx-auto text-center relative z-10">
      <p class="text-xl sm:text-2xl md:text-4xl leading-relaxed text-text/90 font-serif italic">
        "In all the world, there is no heart for me like yours. <br class="hidden md:block"/>
        In all the world, there is no love for you like mine."
      </p>
      <div class="w-16 md:w-24 h-[1px] bg-primary mx-auto mt-8 md:mt-12"></div>
    </section>

    <!-- Masonry Photo Gallery -->
    <section class="min-h-screen px-4 md:px-10 pb-20 md:pb-32 relative z-10">
      <div class="columns-1 sm:columns-2 md:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
        <div 
          v-for="(src, index) in photoList" 
          :key="index"
          class="photo-item break-inside-avoid relative group rounded-lg overflow-hidden shadow-2xl bg-surface p-2"
        >
          <div class="overflow-hidden rounded relative">
             <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img 
              :src="src" 
              class="w-full h-auto object-cover transition-transform duration-[2s] ease-in-out group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Memory Video Section -->
    <section class="memory-section min-h-screen flex flex-col justify-center items-center px-4 md:px-20 bg-gradient-to-t from-bg via-surface/30 to-bg relative z-10">
      <h2 class="text-4xl md:text-6xl font-thin text-primary mb-16 tracking-widest">CHERISHED MEMORIES</h2>
      
      <div class="memory-video w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(var(--color-primary),0.2)] border border-primary/20 p-2 bg-surface/50 backdrop-blur">
        <video 
          class="w-full h-full object-cover rounded-xl"
          controls
          playsinline
        >
          <source :src="memoryVideo" type="video/mp4">
        </video>
      </div>
    </section>

    <!-- Footer -->
    <section class="h-[40vh] flex flex-col justify-center items-center text-center relative z-10">
      <h3 class="text-3xl font-light text-text/60 italic">To be continued...</h3>
    </section>
  </div>
</template>
