module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "max-len": ["error", { "code": 120 }], // Tamaño maximo de linea de codigo de 120, para tener codigo legible
    "semi": ["error", "never"]// Disable the semicolons,
  },
};
