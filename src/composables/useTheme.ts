import { ref } from 'vue';

export interface ThemeColors {
  primary: string; // "R G B"
  bg: string;      // "R G B"
  surface: string; // "R G B"
  text: string;    // "R G B"
  accent: string;  // "R G B"
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

const themes: Theme[] = [
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
  // ... keep others if needed, but let's focus on these for now
];

const currentTheme = ref<Theme>(themes[0]);

export function useTheme() {
  const setTheme = (themeId: string) => {
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
