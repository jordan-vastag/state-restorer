FROM node:23-slim
EXPOSE 5173
EXPOSE 35729

WORKDIR /app

COPY package.json .
RUN npm install yarn && yarn

ENV PATH=$PATH:/app/node_modules/.bin

COPY public/ .
COPY src/ .
COPY tsconfig.* .
COPY vite.config.ts .
COPY index.html .
COPY .env .
COPY .env.docker .