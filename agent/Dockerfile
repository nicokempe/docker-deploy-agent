FROM node:current-alpine@sha256:59ac6536ba03469adc3847f23a4f223b0418fba21c90168d703f61bd84125989

LABEL maintainer="Nico Kempe <kontakt@nicokempe.de>"
LABEL version="v2023.5.1-dev"
LABEL description="Automatic update agent for Docker-based applications on constrained networks."

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
