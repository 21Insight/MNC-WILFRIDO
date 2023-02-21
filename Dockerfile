#Specify a base image
FROM node:alpine

#Exposing port 3000
EXPOSE 3000

#Specify a working directory
WORKDIR /usr/app
COPY ./ ./

#Install dependencies
RUN npm install 

#Default command
CMD ["npm","start"]
