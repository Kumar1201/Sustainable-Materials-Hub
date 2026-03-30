const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    timeout: 60000
  });
  const page = await browser.newPage();

  // Collect console messages
  page.on('console', msg => {
    const args = msg.args();
    Promise.all(args.map(a => a.jsonValue().catch(() => a.toString()))).then(vals => {
      console.log('BROWSER LOG:', msg.type(), ...vals);
    });
  });

  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQUEST FAILED:', req.url(), req.failure().errorText));

  try {
    const url = 'http://localhost:5500/login.html';
    console.log('Opening', url);
  const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  console.log('Response status:', resp && resp.status());
  const html = await page.content();
  console.log('Loaded HTML snippet:\n', html.slice(0, 2000));

    // Fill mobile input and click Continue
    await page.waitForSelector('#mobile', { timeout: 5000 });
    await page.type('#mobile', '7022505992');
    await page.click('#continueBtn');

    // Wait a bit to capture logs (reCAPTCHA rendering, firebase errors)
    await page.waitForTimeout(8000);

    // Capture current URL and snapshot of body
    const currentUrl = page.url();
    console.log('Current URL after click:', currentUrl);
    const body = await page.evaluate(() => document.body.innerText.slice(0, 2000));
    console.log('Page body snippet:\n', body);
  } catch (err) {
    console.error('Test error:', err.message);
  } finally {
    await browser.close();
  }
})();
