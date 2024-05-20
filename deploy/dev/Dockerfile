FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x ./src/scripts/dev.sh
CMD ./src/scripts/dev.sh
