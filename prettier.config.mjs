/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  tailwindFunctions: ['clsx'],
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
