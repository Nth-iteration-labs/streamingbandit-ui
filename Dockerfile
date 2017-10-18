# Build this docker image using the following command
# docker build -t streamingbandit-ui .
# Run this Docker using the following command
# docker run -d -p 80:80 --name sb-ui streamingbandit-ui
FROM node:argon

ADD ./ /sb-ui/
WORKDIR /sb-ui/

RUN npm install -g http-server

EXPOSE 80

CMD ["http-server", "./build", "-p", "80"]