FROM node:6.11.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN npm install -g yarn
RUN yarn install --production -q
COPY ./ /usr/src/app/


CMD ["node", "build/server/main.js"]

EXPOSE 3000
