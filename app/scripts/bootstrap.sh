#!/bin/bash
set -e
npm install

pwd
ls ./
ls ./node_modules
ls ./node_modules/db-migrate
ls ./node_modules/db-migrate/bin

node ./node_modules/db-migrate/bin/db-migrate db:create nodedb -e init-prod 
node ./node_modules/db-migrate/bin/db-migrate up -e prod

npm start