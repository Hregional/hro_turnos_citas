FROM node:14

ENV CORS_HEADERS "Access-Controll-Allow-Origin:http://192.168.1.150:3000,
Access-Controll-Allow-Methods:GET, POST, PUT, DELETE, Access-Controll-Allow-Headers:
Content-Type, Authorization"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]