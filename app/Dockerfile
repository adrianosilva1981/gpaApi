FROM node:16

RUN apt-get update && apt-get install -y python3 make g++ openjdk-11-jdk

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
