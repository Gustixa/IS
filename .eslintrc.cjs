const path = require('path')

module.exports = {
  settings:{
    'import/resolver':{
      alias:{
        map:{
          '@trabajador': path.resolve(__dirname,'./src/pages/trabajador'),
          '@routers': path.resolve(__dirname,'./src/routers'),
          '@components': path.resolve(__dirname,'./src/components'),
          '@images': path.resolve(__dirname,'./public'),
          '@pages': path.resolve(__dirname,'./src/pages'),
          '@estudiante': path.resolve(__dirname,'./src/pages/estudiante'),
          '@contexts': path.resolve(__dirname,'./src/Contexts'),
          '@db-supabase': path.resolve(__dirname,'./src/db/supabase'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Asegúrate de incluir las extensiones de los archivos
      }
    }
  },
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
    "max-len":["error",{"code":120}], // Especificar 120 de largo maximo en codigo
    "semi":["error","never"] // Desactivar punto y coma
  },
}
