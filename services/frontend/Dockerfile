FROM node:12-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./

EXPOSE 3000

CMD npm run dev
