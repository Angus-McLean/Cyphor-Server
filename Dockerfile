FROM dockerfile/nodejs

WORKDIR /home

# Install Mean.JS Prerequisites
# RUN npm install -g grunt-cli
# RUN npm install -g bower

# Pull latest from repo
RUN git clone https://github.com/Angus-McLean/Cyphor-Server.git

# Install Mean.JS packages
# ADD package.json /home/Cyphor-Server/package.json
RUN npm install

# Make everything available for start
ADD . /home/Cyphor-Server

# currently only works for development
ENV NODE_ENV development
ENV DB_ID mongodb://192.168.99.100:27017/test

# Port 3001 for server
# Port 35729 for livereload
EXPOSE 3001 35729
CMD ["node server.js"]
