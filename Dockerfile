FROM node:18-alpine

WORKDIR /dist

RUN npm install -g serve

COPY ./dist .

EXPOSE 4173

CMD ["serve", "-s", ".", "-l", "4173"]