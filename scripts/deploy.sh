#!/bin/bash

# Variables
DOMAIN="store-bet.com"
EMAIL="votre-email@example.com"

# Création des répertoires nécessaires
mkdir -p nginx/certbot/conf
mkdir -p nginx/certbot/www

# Démarrage des conteneurs
docker-compose up -d nginx

# Attente que Nginx soit démarré
echo "Attente du démarrage de Nginx..."
sleep 5

# Obtention du certificat SSL initial
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN

# Redémarrage de Nginx pour charger les certificats
docker-compose restart nginx

# Mise en place du renouvellement automatique des certificats
echo "0 0,12 * * * docker-compose run --rm certbot renew --quiet" | sudo tee -a /var/spool/cron/crontabs/root

# Démarrage de l'application complète
docker-compose up -d

echo "Déploiement terminé !"
echo "L'application est accessible à l'adresse https://$DOMAIN"
