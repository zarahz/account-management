import puppeteer from 'puppeteer';

function Sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

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
