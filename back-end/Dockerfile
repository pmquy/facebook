# Use Node 18 alpine as parent image
FROM node:18-alpine

ENV PORT 3000
ENV MONGO_URI mongodb://127.0.0.1:27017/facebook
ENV REDIS_URL redis://127.0.0.1:6379
ENV SOCKET_PORT 3001
ENV SALT_ROUNDS 10
ENV TOKEN_SECRET fkdsjfkjriewuorauiuries
ENV TOKEN_EXPIRE_IN 10d
ENV ENV DEV
ENV CLIENT http://localhost:5173

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the /app directory
COPY . .

# Install dependencies
RUN npm install



# Expose application port
EXPOSE 3000

# Start the application
CMD npm start
