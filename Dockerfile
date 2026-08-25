FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Se agrega --host para que Vite permita conexiones desde fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host"]