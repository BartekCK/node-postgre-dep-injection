FROM node:14.16.0-alpine AS build
WORKDIR /usr/app
COPY ./src ./src
COPY package.json .
COPY tsconfig.json .
RUN npm install
RUN npm run build

FROM node:14.16.0-alpine
WORKDIR /usr/app
COPY --from=build /usr/app/build ./build
COPY package.json .
RUN npm install --only=production
EXPOSE 8080
CMD ["npm", "start"]