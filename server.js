const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const http = require('http');

// Middleware para habilitar CORS
app.use(cors({
  origin: '*',  // Permitir solicitudes de cualquier origen
  methods: 'GET,POST',  // Solo permitir estos métodos (opcional)
  allowedHeaders: 'Content-Type',  // Solo permitir el encabezado Content-Type
}));

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());
app.use(express.static('/public'));


// Endpoint GET / que devuelve un mensaje de bienvenida
app.get('/', (req, res) => {
  res.json({ message: '¡Bienvenido al servidor!' });
});


http.createServer(app).listen(port, () => {
  console.log(`Servidor HTTP en http://localhost:${port}`);
});