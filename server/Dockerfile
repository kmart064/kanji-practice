FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

RUN npx tsc

# Start the server
CMD ["node", "dist/server.js"]
