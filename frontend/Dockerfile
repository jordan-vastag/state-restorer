FROM node:23
EXPOSE 5173
EXPOSE 35729

COPY package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm install

WORKDIR /app
COPY public/ .
COPY src/ .
COPY package.json .
COPY run.sh .
COPY tsconfig.* .
COPY vite.config.ts .
COPY index.html .

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]