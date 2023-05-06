FROM node:current-alpine

LABEL maintainer="Nico Kempe <kontakt@nicokempe.de>"
LABEL version="v2023.5.1-dev"
LABEL description="Automatic update agent for Docker-based applications on constrained networks."

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
