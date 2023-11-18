FROM node:18.14.0

WORKDIR /scr/app

COPY package.json yarn.lock ./

RUN yarn add

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

