# Optional Docker deployment: builds the static site and serves it with Caddy.
# Build from the repository root:
#   docker build -f deploy/Dockerfile -t yingqiu-site \
#     --build-arg NEXT_PUBLIC_SITE_URL=https://yingqiu.me .
# Or use deploy/docker-compose.yml.

FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://yingqiu.me
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

FROM caddy:2.9-alpine
COPY --from=build /app/out /var/www/site
COPY deploy/Caddyfile /etc/caddy/Caddyfile
EXPOSE 80 443
