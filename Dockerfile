FROM node:16
WORKDIR /opt/lavalink-node-monitor/

# Copy dependencies first to improve layer caching
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
