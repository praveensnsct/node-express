# Use Node 14
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json yarn.lock ./
COPY bin /usr/src/app/bin
COPY src /usr/src/app/src
COPY .env* /usr/src/app/

RUN yarn
RUN yarn build

# Copy all files
COPY . .

EXPOSE 5000

CMD [ "yarn", "serve" ]
