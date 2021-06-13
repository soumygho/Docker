FROM node:13-alpine 

ENV ME_CONFIG_MONGODB_SERVER=mongodb 

RUN mkdir -p /home/app 

COPY . /home/app 

CMD ["node","/home/app/app.js"]