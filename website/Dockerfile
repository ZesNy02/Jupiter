FROM nginx:latest

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

# Clear the default website files
RUN rm -rf /usr/share/nginx/html/*

# Copy the website files
COPY ./dist /usr/share/nginx/html

# Expose the port the app runs in
EXPOSE 80

# Run the app
CMD ["nginx", "-g", "daemon off;"]