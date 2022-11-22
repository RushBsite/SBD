FROM node:16.16.0
COPY package*.json .
RUN npm install --save --legacy-peer-deps
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
