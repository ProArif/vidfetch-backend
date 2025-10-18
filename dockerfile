# Use Python for yt-dlp + Node for backend
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install yt-dlp globally
RUN pip install --upgrade yt-dlp

# Install Node.js (v22)
RUN apt-get update && apt-get install -y curl \
 && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
 && apt-get install -y nodejs build-essential

# Copy package.json and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy the app code
COPY . .

# Expose port for Render
EXPOSE 3000

# Start the Node server
CMD ["node", "index.js"]
