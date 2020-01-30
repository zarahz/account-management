import puppeteer from 'puppeteer';

function Sleep(milliseconds) {
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
  const text = await page.evaluate(element => element.textContent, element)
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

// to do
// test('successfully register', async () => {
//   const browser = await puppeteer.launch({
//     headless: true
//   });

//   const page = await browser.newPage();
//   await page.goto('http://localhost:3000/#/sign-up');
//   await page.type('input#username', 'johndoe32');
//   await page.type('input#titel', 'sir');
//   // await page.select('[data-testid="gender"]', 'Man');
//   await page.type('input#name', 'doe');
//   await page.type('input#surname', 'john');
//   await page.type('input#email', 'doe@doe.com');
//   await page.type('input#password', 'johndoe');
//   // await page.select('[data-testid="securityQuestion"]', 'In what town or city did your mother and father meet?');
//   await page.type('input#securityAnswer', 'Doe Town');
//   await page.type('input#street', 'street');
//   await page.type('input#zipCode', '12345');
//   await page.type('input#city', 'town');
//   await page.type('input#country', 'county');
//   await page.type('input#organisation', 'dow uno');
//   await page.type('input#fieldOfActivity', 'testing');
//   // await page.select('[data-testid="researchInterest"]', 'Web');
//   await page.click('button');
//   await Sleep(5000);
//   const url = page.url();
//   expect(url).toBe('https://pwp.um.lmu.de/g11/');
// }, 50000);

test('unsuccessfully register', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/#/sign-up');
  await page.type('input#username', 'johndoe32');
  await page.type('input#titel', 'sir');
  await page.type('input#name', 'doe');
  await page.type('input#surname', 'john');
  await page.type('input#email', 'doe@doe.com');
  await page.type('input#password', 'johndoe');
  await page.type('input#securityAnswer', 'Doe Town');
  await page.type('input#street', 'street');
  await page.type('input#zipCode', '12345');
  await page.type('input#city', 'town');
  await page.type('input#country', 'county');
  await page.type('input#organisation', 'dow uno');
  await page.type('input#fieldOfActivity', 'testing');
  await page.click('button');
  await Sleep(5000);
  const url = page.url();
  expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/');
}, 50000);

test('successfully login and enter profile overview', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/#/');
  await page.type('input#username', 'johndoe3');
  await page.type('input#password', 'johndoe');
  await page.click('button');
  await Sleep(5000);
  await page.goto('https://pwp.um.ifi.lmu.de/g15/#/profile');
  await Sleep(5000);
  const url = await page.evaluate('location.href');
  expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/#/profile');
}, 50000);

test('successfully go to profile edit view', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  
  const page = await browser.newPage();
  await page.goto('https://pwp.um.ifi.lmu.de/g15/#/');
  await page.type('input#username', 'johndoe3');
  await page.type('input#password', 'johndoe');
  await page.click('button');
  await Sleep(5000);
  await page.goto('https://pwp.um.ifi.lmu.de/g15#/profile');
  await page.click('button');
  const url = page.url();
  expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/#/edit-profile');
}, 50000);

test('successfully save profile', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/#/edit-profile');
  await page.click('[data-testid="save"]');
  const url = page.url();
  expect(url).toBe('http://localhost:3000/');
}, 50000);
