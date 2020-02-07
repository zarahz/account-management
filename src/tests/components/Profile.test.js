import puppeteer from 'puppeteer';

function Sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

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
