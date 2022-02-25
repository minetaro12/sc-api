const port = process.env.PORT || 8000
import puppeteer from 'puppeteer';
import express from 'express';
const app = express();

const usagetext: string = 'Usage: /sc?url=http://example.com<br>\
  Mobile emulate: /sc?url=http://example.com&m=1<br>\
  Dark mode emulate: /sc?url=http://example.com&d=1';

app.get('/', (req, res) => {
  res.send(usagetext);
})

app.get('/sc', (req: any, res) => {
  if(!req.query.url) {
    res.status(400).send(usagetext);
  } else {
    console.log(req.query.url);
    (async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']//,
        //executablePath: '/usr/bin/chromium'  //docker以外はコメントアウト
        });
      try {
        const page = await browser.newPage();
        if( req.query.m === '1' ) {
          await page.emulate(puppeteer.devices['Pixel 4']);
        };
        if( req.query.d === '1' ) {
          await page.emulateMediaFeatures([
            { name: "prefers-color-scheme", value: "dark" },
          ]);
        };
        if (typeof req.query.url !== 'undefined') {
          await Promise.all([
            page.waitForNavigation({waitUntil: ['load', 'networkidle2']}),
            page.goto(req.query.url)
          ]);
        } else {
          throw new Error;
        };
        const data = await page.screenshot({type: 'jpeg', fullPage: true});
        await browser.close();
        res.type('jpeg');
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
  console.log(`Server listening on port ${port}`)
});