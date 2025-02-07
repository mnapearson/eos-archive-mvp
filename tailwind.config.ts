import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dusk-bg': '#16171E',
        'dusk-text': '#E7DBF0',
        'dusk-button-bg': '#E7DBF0',
        'dusk-button-text': '#16171E',

        'dawn-bg': '#F5F1F0',
        'dawn-text': '#342C2A',
        'dawn-button-bg': '#342C2A',
        'dawn-button-text': '#F5F1F0',
      },
    },
  },
  plugins: [],
} satisfies Config;
