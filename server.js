const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const httpsPort = 3443;

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para redirigir a HTTPS y mostrar un mensaje
app.use((req, res, next) => {
  if (!req.secure) {
    res.status(200).send(`
      <html>
        <body>
          <p>Redirigiendo a HTTPS...</p>
          <script>
            setTimeout(function() {
              window.location.href = 'https://' + window.location.host + window.location.pathname;
            }, 3000);
          </script>
        </body>
      </html>
    `);
  } else {
    next();
  }
});

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
https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log(`Servidor HTTPS en https://localhost:${httpsPort}`);
});

// Crear servidor HTTP (para localhost)
http.createServer(app).listen(port, () => {
  console.log(`Servidor HTTP en http://localhost:${port}`);
});