FROM node:14.11-buster-slim

RUN mkdir -p /var/www/vishop
WORKDIR /var/www/vishop

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
