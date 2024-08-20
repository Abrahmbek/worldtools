#!/bin/bash

#PRODUCTION

git reset --hard
git pull origin master
npm i 
npm run build
pm2 start "npm run start:prod" --name=toolscart.kr

#DEPLOYMENT
# pm2 start process.config.js --env deleopment