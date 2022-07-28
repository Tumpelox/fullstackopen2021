FROM node:16 AS base

WORKDIR /usr/src/app

COPY . .

RUN npm ci

FROM base as test

RUN CI=true npm test

FROM test AS build-stage

ARG REACT_APP_BACKEND_URL

RUN REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL npm run build

RUN npm install -g serve

CMD ["serve", "build"]
