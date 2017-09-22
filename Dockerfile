FROM node:8.5
MAINTAINER Ali Mir, ali_mir@brown.edu

# Install app dependencies
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 80

WORKDIR /usr/src/app
CMD [ "npm", "start" ]
