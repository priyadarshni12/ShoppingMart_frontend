FROM node:10.16-alpine

# Working directory be app
WORKDIR /usr/app

COPY package*.json ./

# Install dependencies
RUN npm ci

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]