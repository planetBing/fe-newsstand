// const axios = require("axios");
// const cheerio = require("cheerio");

// const getHTML = async (url) => {
//   try {
//     return await axios.get(url);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const parsing = async (url) => {
//   const html = await getHTML(url);
//   const $ = cheerio.load(html.data);
//   const $news_logo = $(
//     ".MediaSubscriptionView-module__news_thumb___IA4y2 > img"
//   );
//   console.log($news_logo);

//   const newsLogos = [];
//   $news_logo.each((idx, element) => {
//     const src = $(element).attr("src");
//     console.log(src);
//   });
// };

// parsing("https://www.naver.com/");

const pupppeteer = require("puppeteer");

async function main() {
  const browser = await pupppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.naver.com/");
  const ehList = await page.$$(
    ".MediaSubscriptionView-module__news_thumb___IA4y2"
  );
  for (let eh of ehList) {
    const imgSrc = await eh.$eval("img", function (el) {
      return el.src;
    });
    console.log(imgSrc);
  }
  browser.close();
}

main();
