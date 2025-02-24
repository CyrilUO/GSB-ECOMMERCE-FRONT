# Use Node.js as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Start Vite in development mode
CMD ["npm", "run", "dev"]
