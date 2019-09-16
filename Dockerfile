## Build image
FROM node:12.10-alpine
WORKDIR /app
# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install
# Copy app
COPY . .
# Bundle app source
RUN yarn build

EXPOSE 4000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
