FROM node:slim AS builder

WORKDIR /app

# src
COPY /src ./src
COPY index.html .

# packages
COPY package.json .


# vite
COPY vite.config.js .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY tsconfig.node.json .


RUN yarn install
RUN yarn build

FROM node:slim AS server

WORKDIR /dist

RUN npm install -g serve

COPY --from=builder /app/dist .

EXPOSE 4173

CMD ["serve", "-s", ".", "-l", "4173"]