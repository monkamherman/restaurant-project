# Étape de build
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build

# Étape finale avec Nginx
FROM nginx:stable-alpine

# Supprimer la configuration par défaut de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d

# Copier les fichiers de l'application depuis le stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port requis par Render
EXPOSE 10000

# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]