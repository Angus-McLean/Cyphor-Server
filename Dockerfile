FROM node

ARG DB_URI

# Install Server Prerequisites
# RUN npm install -g grunt-cli
# RUN npm install -g bower

# Install Server packages
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /www/Cyphor-Server && cp -a /tmp/node_modules /www/Cyphor-Server/

# Make everything available for start
WORKDIR /www/Cyphor-Server
ADD . /www/Cyphor-Server

# currently only works for development
ENV NODE_ENV development
ENV DB_URI $DB_URI

# Port 3001 for server
# Port 35729 for livereload
EXPOSE 3001 35729
CMD node server.js
