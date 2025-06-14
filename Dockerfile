# Use the official Cypress base image
FROM cypress/included:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files except node_modules
COPY . ./

# Create reports directory and set permissions
RUN mkdir -p cypress/reports/mochawesome && chmod -R 777 cypress/reports/mochawesome

# Exclude node_modules from the image
RUN rm -rf node_modules

# Set environment variable for the image name (optional)
ENV IMAGE_NAME=CYPRESS_DOCKER_IMAGE

# Set the reports directory as a mountable volume for syncing mochawesome reports
VOLUME ["/app/cypress/reports/mochawesome"]

# Default command
CMD ["npx", "cypress", "open"]