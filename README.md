# sc-api

指定されたURLのスクリーンショットを返します

`yarn install` 依存関係のインストール

`yarn start` ポート8000で起動

`PORT=9000 yarn start` ポート9000で起動

※Dockerを使う場合

Dockerを使う場合は`index.js`の18,19行目を下のように変更します
```
args: ['--no-sandbox', '--disable-setuid-sandbox'],
executablePath: '/usr/bin/chromium'  //docker以外はコメントアウト
```

`docker compose build` ビルド

`docker compose up -d` 起動

## 使い方

```
wget localhost:8000/sc?url=http://example.com
curl localhost:8000/sc?url=http://example.com -o sc.png
```

ブラウザでアクセスすることもできます