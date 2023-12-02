FROM node:18.14.0

WORKDIR /app

COPY package.json package.json
COPY . .

RUN yarn install
CMD ["yarn","start"]
