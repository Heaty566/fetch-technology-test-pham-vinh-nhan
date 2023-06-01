FROM node:alpine AS builder

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build:prod


FROM node:alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["yarn", "run", "start:prod"]