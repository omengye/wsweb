FROM     centos:centos7

RUN     yum install -y gcc-c++ make wget curl

RUN     curl -sL https://rpm.nodesource.com/setup_8.x | -E bash -

# Install Node.js and npm
RUN     yum install -y nodejs
RUN     node -v

# Install app dependencies
RUN     npm install

EXPOSE  80
CMD ["node", "index.js"]
