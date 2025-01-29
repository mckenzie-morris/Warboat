import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    // generates Tailwind styles
    tailwindcss('./client/tailwind.config.js'),
    // ensures styles work across different browsers
    autoprefixer,
  ],
};
