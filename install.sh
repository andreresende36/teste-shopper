#!/bin/sh
cd ./app/frontend
npm install
cd ../app/backend
npm install
docker-compose up -d