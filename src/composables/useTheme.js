import { ref } from 'vue';

const themes = [
  {
    id: 'romantic',
    name: 'Eternal Love',
    colors: {
      primary: '255 182 193', // Light Pink
      bg: '20 10 15',         // Very Dark Warm
      surface: '40 20 25',    // Dark Rose
      text: '255 240 245',    // Lavender Blush
      accent: '220 20 60',    // Crimson
    },
  },
  {
    id: 'cyber',
    name: 'Cyber Blue',
    colors: {
      primary: '0 255 255', // Cyan
      bg: '10 10 12',       // Dark
      surface: '20 20 25',  // Dark Surface
      text: '240 240 240',  // White
      accent: '255 0 255',  // Magenta
    },
  },
  {
    id: 'midnight',
    name: 'Midnight Dream',
    colors: {
      primary: '100 149 237', // Cornflower Blue
      bg: '10 10 30',         // Deep Blue
      surface: '20 20 50',    // Dark Blue Surface
      text: '230 230 250',    // Lavender
      accent: '255 215 0',    // Gold
    },
  },
  {
    id: 'sunset',
    name: 'Sunset Promise',
    colors: {
      primary: '255 160 122', // Light Salmon
      bg: '30 15 10',         // Deep Brown/Red
      surface: '60 30 20',    // Dark Orange/Brown
      text: '255 235 205',    // Blanched Almond
      accent: '255 69 0',     // Red Orange
    },
  },
  {
    id: 'forest',
    name: 'Forest Whisper',
    colors: {
      primary: '144 238 144', // Light Green
      bg: '5 20 10',          // Deep Green
      surface: '20 40 25',    // Dark Green Surface
      text: '240 255 240',    // Honeydew
      accent: '50 205 50',    // Lime Green
    },
  },
];

const currentTheme = ref(themes[0]);

export function useTheme() {
  const setTheme = (themeId) => {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;

    currentTheme.value = theme;
    
    // Apply CSS variables to :root
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-bg', theme.colors.bg);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-accent', theme.colors.accent);
    
    localStorage.setItem('user-theme-id', theme.id);
  };

  const initTheme = () => {
    // Default to romantic if not set
    const savedId = localStorage.getItem('user-theme-id');
    if (savedId) {
      setTheme(savedId);
    } else {
      setTheme(themes[0].id);
    }
  };

  return {
    themes,
    currentTheme,
    setTheme,
    initTheme,
  };
}
