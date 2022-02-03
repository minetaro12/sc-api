const port = process.env.PORT || 8000
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Usage: /sc?url=http://example.com');
})

app.get('/sc', (req, res) => {
  if( !req.query.url ) {
    res.status(400).send('Usage: /sc?url=http://example.com');
  } else {
    console.log(req.query.url);
    (async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
        //executablePath: '/usr/bin/chromium'  //docker以外はコメントアウト
        });
      try {
        const page = await browser.newPage();
        await Promise.all([
          page.waitForNavigation({waitUntil: ['load', 'networkidle2']}),
          page.goto(req.query.url)
        ]);
        var data = await page.screenshot({type: 'png', fullPage: true});
        await browser.close();
        res.type('png');
        res.send(data);
      } catch(e) {
        console.log('Error');
        await browser.close();
        res.status(500).send('Error');
      };
    })();
  };
});

app.listen(port, () => {
  console.log('Server listening on port ' + port)
});