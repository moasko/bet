# Stage de build
FROM node:18-alpine AS builder

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm ci

# Copie des fichiers du projet
COPY . .

# Génération du build Prisma
RUN npx prisma generate

# Build de l'application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage de production
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Copie des fichiers nécessaires depuis le stage de build
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Installation de Prisma Client
RUN npm install @prisma/client

# Expose le port 3000
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]