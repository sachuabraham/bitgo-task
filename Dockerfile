FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock*", "./"]
RUN yarn install
COPY tsconfig*.json ./
COPY . .
RUN npm run build

FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock*", "./"]
RUN yarn install --prod && mv node_modules ../
COPY --from=builder /usr/src/app/dist/ dist/
CMD ["node", "dist/index.js"]

