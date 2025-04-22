FROM node:23
EXPOSE 5173
EXPOSE 35729

WORKDIR /app

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm install yarn && yarn

COPY public/ .
COPY src/ .
COPY package.json .
COPY tsconfig.* .
COPY vite.config.ts .
COPY index.html .
COPY .env .
COPY .env.docker .