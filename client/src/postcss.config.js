import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss('./client/tailwind.config.js'),
    autoprefixer,
  ],
};
