FROM node:15

COPY ./app /usr/src/app

WORKDIR /usr/src/app

EXPOSE 3000

ENTRYPOINT [ "./scripts/bootstrap.sh" ]