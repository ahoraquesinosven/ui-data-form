FROM node:20

# Ensure we have a valid working directory
RUN mkdir -p /app
WORKDIR /app

# Setup linter rules
COPY .eslintrc.cjs ./

# Setup project dependencies
COPY package*.json ./
RUN npm install


# Setup the rest of the application
COPY index.html ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY src ./src
COPY public ./public
