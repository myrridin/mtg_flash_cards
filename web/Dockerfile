FROM node

RUN apt-get update
RUN apt-get install inotify-tools -y

ENV NPM_CONFIG_LOGLEVEL warn
ENV APP_ENV production

RUN mkdir -p /myapp
WORKDIR /myapp

RUN yarn install

CMD yarn start
EXPOSE 8080