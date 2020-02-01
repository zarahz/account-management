import puppeteer from 'puppeteer';

function Sleep (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

test('click forget password and enter email', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/#/');
  await page.click('.LinkTextLink');
  await Sleep(5000);
  await page.type('input#email', 'john35@doe.com');
  await page.click('button');
  await Sleep(5000);
  const element = await page.$('.FormField__Label');
  const text = await page.evaluate(element => element.textContent, element);
  expect(text).toBe('Answer security question');
}, 50000);

test('click forget password, enter email and answer securiy question', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/');
  await page.click('.LinkTextLink');
  await Sleep(5000);
  await page.type('input#email', 'john35@doe.com');
  await page.click('button');
  await Sleep(5000);
  await page.type('input#securityAnswer', 'Doe town');
  await page.click('button');
  await Sleep(5000);
  const element = await page.$('.Description_Text');
  const text = await page.evaluate(element => element.textContent, element);
  expect(text).toBe('Please select a new password');
}, 50000);

test('click forget password and successfully set new password', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/');
  await page.click('.LinkTextLink');
  await Sleep(5000);
  await page.type('input#email', 'john35@doe.com');
  await page.click('button');
  await Sleep(5000);
  await page.type('input#securityAnswer', 'Doe town');
  await page.click('button');
  await Sleep(5000);
  await page.type('input#newPassword', 'johndoe');
  await page.type('input#checkPassword', 'johndoe');
  await page.click('button');
  await Sleep(5000);
  const url = page.url();
  expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/#/');
}, 50000);

test('click forget password and unsuccessfully set new password', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/');
  await page.click('.LinkTextLink');
  await Sleep(5000);
  await page.type('input#email', 'john35@doe.com');
  await page.click('button');
  await Sleep(5000);
  await page.type('input#securityAnswer', 'Doe town');
  await page.click('button');
  await Sleep(5000);
  await page.type('input#newPassword', 'johndoe');
  await page.type('input#checkPassword', 'johndoe25');
  await page.click('button');
  await Sleep(5000);
  const url = page.url();
  expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/#/password-reset');
}, 50000);
