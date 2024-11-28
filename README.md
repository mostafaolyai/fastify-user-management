
# Fastify User Management

Fastify User Management is a backend application built using **NestJS** and **TypeScript**, leveraging **MongoDB** as the database and **TypeORM** as the ORM. The project includes features like rate-limiting, testing, and is fully containerized using Docker and Docker Compose.

## Table of Contents
- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Running with Docker](#running-with-docker)
  - [Running without Docker](#running-without-docker)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Rate Limiting](#rate-limiting)
- [Configuration Notes](#configuration-notes)

## Technologies

- **Language**: TypeScript  
- **Framework**: NestJS  
- **Database**: MongoDB  
- **ORM**: TypeORM  
- **Testing**: Jest  
- **Rate Limiting**: `@nestjs/throttler`  
- **Docker**: Supported  
- **Docker Compose**: Supported  

## Features
- Clean and scalable architecture with NestJS.  
- Containerized with Docker for ease of deployment.  
- API rate limiting using `@nestjs/throttler`.  
- Comprehensive testing using Jest.  
- Swagger documentation for API endpoints.  

## Getting Started

### Running with Docker

1. Build the Docker image:  
   ```bash
   docker build -t fastify_user_management .
   ```  

2. Start the application with Docker Compose:  
   ```bash
   docker compose up -d
   ```  

3. Access the API documentation at:  
   [http://localhost:3001/api](http://localhost:3001/api)  

> **Note**:  
> The image name **`fastify_user_management`** is hardcoded and cannot be changed.  

### Running without Docker

1. Update the `DB_HOST` and `DB_PORT` values in your environment configuration file to match your MongoDB setup.  

2. Start the application in development mode:  
   ```bash
   npm run start:dev
   ```  

3. Access the API documentation at:  
   [http://localhost:3001/api](http://localhost:3001/api)  

## Testing

Run the tests with Jest:  
```bash
npm run test
```  

## API Documentation

Swagger is integrated for API documentation. You can view it at:  
[http://localhost:3001/api](http://localhost:3001/api)  

## Rate Limiting

The project uses `@nestjs/throttler` for rate limiting. The configuration is located in the `AppModule`.  
You can also define custom rate-limiting rules for specific endpoints as needed.  

## Configuration Notes

1. The `DB_HOST` environment variable is set to the name of the MongoDB container (`mongo`) by default.  
   - If you change this value, ensure you update the `docker-compose.yml` file accordingly.  

2. For running without Docker, ensure the `DB_HOST` and `DB_PORT` values are updated to point to your MongoDB instance.  
