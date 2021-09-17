# Use Node 14
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json yarn.lock ./

RUN yarn

# Copy all files
COPY . .

RUN yarn build
