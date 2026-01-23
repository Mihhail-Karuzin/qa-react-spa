FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

# Ensure Node.js is compatible with Vite (20.19+)
RUN node -v

# Copy project files
COPY . .

# Install root dependencies
RUN npm ci

# Install frontend dependencies
RUN cd frontend && npm ci

# Run Playwright tests
CMD ["npx", "playwright", "test"]


