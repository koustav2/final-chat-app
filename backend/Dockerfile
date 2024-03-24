# Frontend Docker 
FROM node:alpine
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY .env .

# Expose port
EXPOSE $PORT

# Command to run the application
CMD ["npm", "run", "dev"]
