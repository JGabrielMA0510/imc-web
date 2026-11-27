FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY public ./public
COPY api ./api

EXPOSE 3000

CMD ["npm", "start"]