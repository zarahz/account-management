import puppeteer from 'puppeteer';

function Sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

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
