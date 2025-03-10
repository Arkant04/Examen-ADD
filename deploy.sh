#!/bin/bash

echo "conectando al servidor remoto..."

apt update

apt install npm nodejs certbot 

npm install

# Generar certificados SSL usando certbot
certbot certonly --standalone -d dev4.cyberbunny.online --non-interactive --agree-tos -m delacorte19@gmail.com

# Copiar los certificados generados a la ubicación esperada por tu aplicación
cp /etc/letsencrypt/live/dev4.cyberbunny.online/fullchain.pem 
cp /etc/letsencrypt/live/dev4.cyberbunny.online/privkey.pem 

echo "proceso completado"