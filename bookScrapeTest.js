const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('http://books.toscrape.com/');

    const result = await page.evaluate(() => {
        let data = []; // An empty array to store scraped data
        let elements = document.querySelectorAll('.product_pod'); // Select all products

        for (var element of elements){ // Loop through each product
            let title = element.childNodes[5].innerText; // Get the title
            let price = element.childNodes[7].children[0].innerText; // Get the price

            data.push({title, price}); // Push a data object into the array
        }

        return data; // Return the data array
    });

    browser.close();
    return result; // Return the data
};

scrape().then((value) => {
    console.log(value); // Gucci
});