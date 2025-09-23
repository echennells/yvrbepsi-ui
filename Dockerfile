# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for sharp and other native modules
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++

# Copy package files
COPY package*.json ./

# Install dependencies with verbose logging to catch issues
RUN npm ci --verbose --no-audit --no-fund

# Copy source code
COPY . .

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]