FROM node:20

# Set working dir for the container
WORKDIR /app

# Copy package.json and lock file from /server
COPY server/package*.json ./      

RUN npm install

# Copy actual server code
COPY server/ ./                   

# Copy shared folder for interfaces
COPY shared/ ../shared/      

EXPOSE 5001
CMD ["npm", "run", "start"]
