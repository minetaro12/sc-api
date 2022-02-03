FROM node:lts-alpine

#必要なパッケージをインストール&フォントのインストール
RUN apk add --no-cache chromium && \
    ln /usr/bin/chromium-browser /usr/bin/chromium && \
    mkdir /noto && \
    cd /noto && \
    wget https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip && \
    unzip NotoSansCJKjp-hinted.zip && \
    mkdir -p /usr/share/fonts/noto && \
    cp *.otf /usr/share/fonts/noto && \
    chmod 644 -R /usr/share/fonts/noto/ && \
    fc-cache -fv && \
    cd .. && \
    rm -rf /noto && \
    mkdir /server

WORKDIR /server

#ファイルのコピー
COPY ./index.js /server/
COPY ./package.json /server/
COPY ./yarn.lock /server/

#依存関係のインストール
RUN echo "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=TRUE" > .npmrc && \
    yarn install && \
    yarn cache clean && \
    rm -rf /root/.npm

CMD /usr/local/bin/yarn start
