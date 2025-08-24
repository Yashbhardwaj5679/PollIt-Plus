# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything (backend code)
COPY . .

# Expose backend port
EXPOSE 4000

# Default command (overridden in dev by docker-compose.override.yml)
CMD ["npm", "start"]
