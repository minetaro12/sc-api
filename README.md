# sc-api

指定されたURLのスクリーンショットを返します

`yarn install` 依存関係のインストール

`yarn start` ポート8000で起動

`PORT=9000 yarn start` ポート9000で起動

## 使い方

```
wget localhost:8000/sc?url=http://example.com
curl localhost:8000/sc?url=http://example.com > sc.png
```

ブラウザでアクセスすることもできます