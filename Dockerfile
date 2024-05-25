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
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY public ./public
COPY index.html ./
COPY src ./src
