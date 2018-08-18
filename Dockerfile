FROM node:10
ENV NODE_ENV production
RUN mkdir -p /app
WORKDIR /app

RUN npm install -g nodemon
COPY package.json /app/package.json

RUN npm install --production
COPY . /app

ENV PORT 80
EXPOSE 80

CMD ["npm", "start"]