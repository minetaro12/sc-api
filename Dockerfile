FROM node:lts-alpine

#必要なパッケージをインストール
RUN apk add --no-cache chromium && ln /usr/bin/chromium-browser /usr/bin/chromium

RUN mkdir /noto

WORKDIR /noto

RUN wget https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip && \
    unzip NotoSansCJKjp-hinted.zip && \
    mkdir -p /usr/share/fonts/noto && \
    cp *.otf /usr/share/fonts/noto && \
    chmod 644 -R /usr/share/fonts/noto/ && \
    fc-cache -fv && \
    cd .. && \
    rm -rf /noto

WORKDIR /

RUN mkdir /server

WORKDIR /server

#ファイルのコピー
COPY ./index.js /server/
COPY ./package.json /server/
COPY ./yarn.lock /server/

#依存関係のインストール
RUN echo "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=TRUE" > .npmrc && yarn install && yarn cache clean && rm -rf /root/.npm

CMD /usr/local/bin/yarn start