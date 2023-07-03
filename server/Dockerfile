FROM node:19-alpine As Development

ENV NODE_ENV=development

WORKDIR /user/app

COPY package*.json ./
COPY yarn.lock ./


RUN yarn install --only=production

COPY . .

EXPOSE 3000

RUN yarn build;


FROM node:19-alpine As Production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
#COPY ../prisma    ./prisma/

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3001

CMD [ "yarn", "start:prod" ]