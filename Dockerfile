FROM node:lts-alpine3.19
WORKDIR /app-frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]