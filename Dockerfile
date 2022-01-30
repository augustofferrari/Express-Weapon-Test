FROM node:16-alpine

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package.json .

RUN npm install --quiet

# Instalar nodemon de forma global
RUN npm install nodemon -g  --quiet

RUN chmod 777 /usr/app/node_modules/@prisma
RUN chmod 777 -R /usr/app/node_modules/.prisma

COPY . .
EXPOSE 30100

CMD npm run dev