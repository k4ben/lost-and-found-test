function generateSerialNumbersWithPrefix(prefix, suffix="") {
  const serialNumbers = [];
  for (let i = 0; i < 1000; i++) {
      serialNumbers.push(prefix + i.toString().padStart(3, '0') + suffix);
  }
  return serialNumbers;
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  safelist: [...generateSerialNumbersWithPrefix('group/'), ...generateSerialNumbersWithPrefix('group-hover/', ':join'), ...generateSerialNumbersWithPrefix('group-hover/', ':bg-primary'), ...generateSerialNumbersWithPrefix('group-hover/', ':text-primary-content')],
  daisyui: {
    themes: true
  },
  plugins: [require("daisyui")]
};