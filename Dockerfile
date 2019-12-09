FROM node:10.15.3
WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . /usr/src/
ENV NODE_ENV "${NODE_ENV}"
ENV PORT "${PORT}"
ENV MONGO_URI "${MONGO_URI}"
ENV REDIS_URI "${REDIS_URI}"

RUN npm run build

ENTRYPOINT npm run start:prod
