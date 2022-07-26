FROM node:16 AS base

WORKDIR /usr/src/app

COPY . .

RUN npm ci

FROM base as test

RUN CI=true npm test

FROM test AS build-stage

RUN REACT_APP_BACKEND_URL=http://localhost:3000 npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
