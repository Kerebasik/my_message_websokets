FROM node:19-alpine As Development

ENV NODE_ENV=development

WORKDIR /app

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

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY yarn.lock ./

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3001

CMD [ "yarn", "start:prod" ]