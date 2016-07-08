FROM node

# Build Arguments
ARG DB_URI
ARG NODE_ENV

# Install Server Prerequisites
# RUN npm install -g grunt-cli
# RUN npm install -g bower
RUN npm install -g pm2

# Install Mean.JS packages
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Make everything available for start
WORKDIR /src
ADD . /src

# Set environment variables
ENV NODE_ENV $NODE_ENV
ENV DB_URI $DB_URI

# Port 3001 for server
EXPOSE 3001

# Run application
CMD pm2 start server.js -i 2 --no-daemon
