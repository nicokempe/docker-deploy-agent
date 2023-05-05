FROM node:current-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npx", "ts-node", "agent.ts"]
