# ---- Base Node ----
FROM node:alpine AS base  
WORKDIR /app  
COPY package*.json ./
RUN npm install

# ---- Copy Files/Build ----
FROM base AS build  
WORKDIR /app  
COPY . .

# ---- Release ----
FROM base AS release  
COPY --from=build /app/node_modules ./node_modules
COPY . .
COPY .env .
EXPOSE 5173
CMD ["npm", "run", "dev"]
