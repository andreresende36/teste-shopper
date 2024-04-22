FROM node:lts-alpine3.19
WORKDIR /app-backend
COPY package*.* ./
RUN npm install
COPY . .
EXPOSE 3001
ENTRYPOINT ["npm", "run"]
CMD ["dev"]