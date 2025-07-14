FROM node:22.17.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm prune --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
