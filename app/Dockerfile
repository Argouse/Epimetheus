FROM node:18

ENV LOKI_URL=http://loki:3100
ENV REPORT_ID=${REPORT_ID}

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3002
CMD [ "node", "app.js" ]