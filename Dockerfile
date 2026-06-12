FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY index.html styles.css app.js server.js ./
COPY data ./data

ENV PORT=4173
ENV DATA_DIR=/data

EXPOSE 4173

CMD ["npm", "start"]
