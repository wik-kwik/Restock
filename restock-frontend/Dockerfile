FROM node:21.5.0-alpine as builder
WORKDIR /builder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /builder/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]