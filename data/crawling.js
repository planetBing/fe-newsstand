const pupppeteer = require("puppeteer");
const fs = require("fs");

async function main() {
  const browser = await pupppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.naver.com/");

  const ehList1 = await page.$$(
    ".MediaSubscriptionView-module__news_thumb___IA4y2"
  );
  const imgSrcArr = [];
  for (let eh of ehList1) {
    const imgSrc = await eh.$eval("img", function (el) {
      return el.src;
    });
    const imgObj = { src: imgSrc };
    imgSrcArr.push(imgObj);
  }

  await page.click(".ContentPagingView-module__btn_next___ZBhby");
  const ehList2 = await page.$$(
    ".MediaSubscriptionView-module__news_thumb___IA4y2"
  );
  for (let eh of ehList2) {
    const imgSrc = await eh.$eval("img", function (el) {
      return el.src;
    });
    const imgObj = { src: imgSrc };
    imgSrcArr.push(imgObj);
  }

  await page.click(".ContentPagingView-module__btn_next___ZBhby");
  const ehList3 = await page.$$(
    ".MediaSubscriptionView-module__news_thumb___IA4y2"
  );
  for (let eh of ehList3) {
    const imgSrc = await eh.$eval("img", function (el) {
      return el.src;
    });
    const imgObj = { src: imgSrc };
    imgSrcArr.push(imgObj);
  }

  await page.click(".ContentPagingView-module__btn_next___ZBhby");
  const ehList4 = await page.$$(
    ".MediaSubscriptionView-module__news_thumb___IA4y2"
  );
  for (let eh of ehList4) {
    const imgSrc = await eh.$eval("img", function (el) {
      return el.src;
    });
    const imgObj = { src: imgSrc };
    imgSrcArr.push(imgObj);
  }

  const jsonImgData = JSON.stringify(imgSrcArr);
  fs.writeFileSync("logoImg.json", jsonImgData);

  browser.close();
}

// main();

async function crawlBreakingNews() {
  const browser = await pupppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://news.naver.com/main/list.naver?mode=LPOD&sid2=140&sid1=001&mid=sec&oid=001&isYeonhapFlash=Y&aid=0014551085&date=20240308&page=1"
  );

  const breakingNewsList = await page.$$("ul a strong");
  const breakingNewsArr = [];
  breakingNewsList.forEach((newsEl) =>
    breakingNewsArr.push(newsEl.textContent)
  );

  const breakingNewsToJson = JSON.stringify(breakingNewsArr);
  fs.writeFileSync("breakingNews.json", breakingNewsToJson);

  browser.close();
}

crawlBreakingNews();
