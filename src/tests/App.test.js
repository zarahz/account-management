import puppeteer from 'puppeteer';

test('succssesfully login', async () => {
  const browser = await puppeteer.launch({
    headless: true
    // slowMo: 80,
    // args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.type('input#username', 'johndoe3');
  await page.type('input#password', 'johndoe');
  await page.click('button');
  setTimeout(() => {
    const url = page.url();
    expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/');
  }, 10000);
}, 500000);

test('unsuccssesfully login', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.type('input#username', 'johndoe3');
  await page.type('input#password', 'johndoe3');
  await page.click('button');
  setTimeout(() => {
    const url = page.url();
    expect(url).toBe('http://localhost:3000/#');
  }, 10000);
}, 500000);

test('set new password', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.click('a');
  setTimeout(async () => {
    const url = page.url();
    expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/#/password-reset');
    const buttonText = await page.$eval(button => button.textContent);
    console.log(buttonText);
    expect(buttonText).toBe('NEXT');
    await page.type('input#email', 'john35@doe.com');
    await page.click('button');
    setTimeout(async () => {
      const labelText = await page.$eval(label => label.textContent);
      expect(labelText).toBe('ANSWER SECURITY QUESTION');
      await page.type('input#securityAnswer', 'Doe town');
      await page.click('button');
      setTimeout(async () => {
        const paragraphText = await page.$eval(p => p.textContent);
        expect(paragraphText).toBe('Please select a new password');
        await page.type('input#newPassword', 'johndoe');
        await page.type('input#checkPassword', 'johndoe');
        await page.click('button');
        setTimeout(() => {
          const url = page.url();
          console.log(url);
          expect(url).toBe('https://pwp.um.ifi.lmu.de/g15/#');
        }, 10000);
      }, 10000);
    }, 10000);
  }, 10000);
}, 500000);

test('succssesfully register', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/#/sign-up');
  await page.type('input#username', 'johndoe32');
  await page.type('input#titel', 'sir');
  // await page.select('[data-testid="gender"]', 'Man');
  await page.type('input#name', 'doe');
  await page.type('input#surname', 'john');
  await page.type('input#email', 'doe@doe.com');
  await page.type('input#password', 'johndoe');
  // await page.select('[data-testid="securityQuestion"]', 'In what town or city did your mother and father meet?');
  await page.type('input#securityAnswer', 'Doe Town');
  await page.type('input#street', 'street');
  await page.type('input#zipCode', '12345');
  await page.type('input#city', 'town');
  await page.type('input#country', 'county');
  await page.type('input#organisation', 'dow uno');
  await page.type('input#fieldOfActivity', 'testing');
  // await page.select('[data-testid="researchInterest"]', 'Web');
  await page.click('button');
  setTimeout(() => {
    const url = page.url();
    expect(url).toBe('https://pwp.um.lmu.de/g11/');
  }, 10000);
}, 500000);

test('succssesfully go to profile edit view', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/#/profile');
  await page.click('button');
  const url = page.url();
  expect(url).toBe('http://localhost:3000/#/edit-profile');
}, 500000);

test('succssesfully save profile', async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/#/edit-profile');
  await page.click('[data-testid="save"]');
  const url = page.url();
  expect(url).toBe('http://localhost:3000/');
}, 500000);
