const express = require('express');
const app = express();
const port = 3001; // Puerto en el que se ejecutará el servidor

// Configuración de rutas y middleware aquí...

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
})

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!')
})