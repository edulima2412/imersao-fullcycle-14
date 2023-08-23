FROM node:20-slim

RUN apt update -y && apt install -y openssl procps

WORKDIR /home/node/app

USER node

CMD [ "tail", "-f", "/dev/null" ]