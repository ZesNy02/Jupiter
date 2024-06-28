FROM nginx:latest

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

# Clear the default website files
RUN rm -rf ./*

# Copy the website files
COPY ./dist .

# Expose the port the app runs in
EXPOSE 80

# Run the app
CMD ["nginx", "-g", "daemon off;"]