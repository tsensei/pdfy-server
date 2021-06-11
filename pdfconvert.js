const puppeteer = require("puppeteer");

const createPdf = async (url, uuid) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = {
    path: `pdf/${uuid}.pdf`,
    format: "A4",
  };

  console.log("pdfconvert running");

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  await page.pdf(options);

  await browser.close();

  console.log("pdfconvert closed");
};

module.exports = createPdf;
