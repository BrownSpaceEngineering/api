FROM node:8.5
MAINTAINER Ali Mir, ali_mir@brown.edu

# Install app dependencies
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /var/www/node_modules
RUN cp -a /tmp/node_modules /var/www/node_modules
RUN npm install
COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
