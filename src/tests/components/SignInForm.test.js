import puppeteer from 'puppeteer';

function Sleep (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

test('successfully login', async () => {
  const browser = await puppeteer.launch({
    headless: true
    // slowMo: 80,
    // args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/');
  await page.type('input#username', 'johndoe3');
  await page.type('input#password', 'johndoe');
  await page.click('button');
  await Sleep(5000);
  const url = page.url();
  expect(url).toBe('https://pwp.um.ifi.lmu.de/g11/');
}, 50000);

test('unsuccessfully login', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/');
  await page.type('input#username', 'johndoe3');
  await page.type('input#password', 'johndoe3');
  await page.click('button');
  await Sleep(5000);
  const url = page.url();
  expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/#/');
}, 50000);

test('click forget password', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/');
  await page.click('.LinkTextLink');
  await Sleep(5000);
  const url = page.url();
  expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/#/password-reset');
}, 50000);
