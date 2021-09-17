# Node Express <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Package Scripts](#package-scripts)

## Prerequisites
Install the following before you start:
- Node.js >= 14
  - Mac / Linux users with nvm: `$ nvm install 14`
    - nvm is highly recommended
  - Install directly from Node: https://nodejs.org/en/
- Yarn
  - Follow instructions here: https://yarnpkg.com/en/
- Docker
  - Follow instructions here: https://docs.docker.com/get-docker/

## Getting Started
1. Clone project from git repository
    - `$ git clone git@github.com:praveensnsct/node-express.git`
2.  Change to project directory
    - `$ cd node-express`
3. Install dependencies
    - `$ yarn`
4.  Install mongo db from Docker
    - `$ yarn install-mongo`
5.  Start Mongo server. If it fails proceed to Step 8.
    - `$ yarn start-mongo`
6.  Create .env.local file in the root of your project directory and copy the below contents for mongoDB connection. This file is private and will not be shared.
    - MONGO_DB_HOST='0.0.0.0'
    - MONGO_DB_PORT='27017'
    - MONGO_DB_NAME='mydatabase'
    - MONGO_DB_USER = 'mongoadmin'
    - MONGO_DB_PWD = 'secret'
    - SESSION_SECRET = ["24c652df5e86486df21bbca7f0069cdec658b54f"]
7.  Start server
    - `$ yarn start`
8.  Do this if step 5 fails and then process to Step 5
    - `$ yarn docker-clean`

## Package Scripts
| Script               | Description                                               |
|----------------------|-----------------------------------------------------------|
| `yarn start`         | Start development application server                      |
| `yarn lint`          | Run linter against src                                    |
| `yarn lint:fix`      | `yarn lint` but automatically fix any problems            |
| `yarn build`         | Build application distributable files                     |
| `yarn serve`         | Start application server                                  |
| `yarn install-mongo` | Install MongoDB locally                                   |
| `yarn start-mongo`   | Start mongo server in docker 
| `yarn docker-clean`  | Clean the existing containers and images                  |