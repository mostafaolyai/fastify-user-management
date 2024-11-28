# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.env ./

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
