FROM node:21.5.0-alpine
WORKDIR /builder
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

#W przyszłości to można podzielić na stag'e ale tera to bez sensu bo słabo to działa
#FROM nginx:alpine
#COPY --from=builder /builder/build /usr/share/nginx/html
#COPY --from=builder /builder/restock-frontend.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]