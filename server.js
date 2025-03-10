const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors({
  origin: '*',  // Permitir solicitudes de cualquier origen
  methods: 'GET,POST',  // Solo permitir estos métodos (opcional)
  allowedHeaders: 'Content-Type',  // Solo permitir el encabezado Content-Type
}));

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint GET / que devuelve la página index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configuración del servidor HTTPS
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'privkey.pem')), // Ruta a tu archivo .key
  cert: fs.readFileSync(path.join(__dirname, 'fullchain.pem')) // Ruta a tu archivo .pem
};

// Crear servidor HTTPS (solo para VPS)
https.createServer(httpsOptions, app).listen(3443, () => {
  console.log(`Servidor HTTPS en https://localhost:3443`);
});

// Crear servidor HTTP (para localhost)
http.createServer(app).listen(port, () => {
  console.log(`Servidor HTTP en http://localhost:${port}`);
});
