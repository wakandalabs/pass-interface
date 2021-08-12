FROM nginx:alpine
COPY ./web/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]