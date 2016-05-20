FROM node

# Install Server Prerequisites
# RUN npm install -g grunt-cli
# RUN npm install -g bower

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
# Port 35729 for livereload
EXPOSE 3001 35729

# Run application
CMD ["node", "server.js"]
