# # Use an official Node.js runtime as a parent image
# FROM node:18-alpine

# # Set the working directory in the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to the container
# COPY . .

# # Build the application for production
# RUN npm run build --verbose

# # Expose the port the app runs on (adjust to the correct port if necessary)
# EXPOSE 4173

# # Define the command to start the application 
# CMD ["npm", "run", "preview"]

# #this is a test comment 
# #this is a test comment 2
# #this is a test comment 3

# Build stage
FROM node:18-slim AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build 

# Production stage
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app .
EXPOSE 4173
CMD ["npm", "run", "preview"]
