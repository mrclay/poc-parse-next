# Build stage
#############

FROM node:carbon-alpine AS build

# 1. Install necessary build dependencies
#RUN apk --no-cache add --virtual build-deps build-base python

# 2. Copy package configuration and install all dependencies
WORKDIR /app-src/
COPY package*.json ./
RUN npm install --build-from-source

# 3. Copy build configuration and build sources
COPY Gulpfile.js .babelrc tsconfig.json tslint.json ./
COPY src ./src
RUN npm run build

# 4. Prune npm to production-only
RUN npm prune --production

# 5. Copy static files needed by the server at runtime
COPY .env.example ./
#COPY assets/index.html ./assets/index.html

# Run-time stage
################

FROM node:carbon-alpine

# 1. Copy package configuration and the pre-built dependencies
WORKDIR /app/
COPY --from=build /app-src/package*.json ./
COPY --from=build /app-src/node_modules ./node_modules

# 2. Copy built and static files into the container
COPY --from=build /app-src/lib ./lib
#COPY --from=build /app-src/assets/index.html ./assets/index.html
COPY --from=build /app-src/.env.example ./

# Set up runtime environment
ENV NODE_ENV=production
USER node:node

# 3. Run the server script
CMD ["node", "lib/index.js"]
