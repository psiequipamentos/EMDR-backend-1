FROM node:14

WORKDIR /app

COPY package.json package.json
COPY . .

RUN yarn install
CMD ["yarn","start"]
