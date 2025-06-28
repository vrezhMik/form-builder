# client/Dockerfile

# ========== Build Stage ==========
FROM node:20 as builder

WORKDIR /app

# Copy dependencies
COPY client/package*.json ./
RUN npm install

# Copy client source
COPY client/ ./client
COPY shared/ ./shared    

# Build production React app
WORKDIR /app/client
RUN npm run build


# ========== Serve Stage ==========
FROM nginx:alpine
COPY --from=builder /app/client/build /usr/share/nginx/html

# Optional: custom NGINX config
# COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
