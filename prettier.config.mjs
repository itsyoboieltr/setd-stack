/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
