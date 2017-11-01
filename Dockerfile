# DOCKER-VERSION 0.3.4
FROM    centos:7.4

RUN     yum install -y gcc-c++ make wget
RUN     curl -sL https://rpm.nodesource.com/setup_8.x | sudo -E bash -
# Install Node.js and npm
RUN     yum install -y nodejs
RUN     node -v

# Install app dependencies
RUN     npm install

EXPOSE  80
CMD ["node", "index.js"]