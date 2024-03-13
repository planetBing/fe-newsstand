const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const naverURL = "https://www.naver.com";

async function crawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(naverURL);

  //그리드 보기
  await page.click(".ContentPagingView-module__btn_view_list___j7eNR");
  const pressList = [];

  const pressObj = {};
  const brandMarks = await page.$$(
    ".MediaNewsView-module__news_top___KTy0M a img"
  );
  for (const bm of brandMarks) {
    const imgSrc = await page.evaluate((el) => el.getAttribute("src"), bm);
    const alt = await page.evaluate((el) => el.getAttribute("alt"), bm);
    pressObj["pressName"] = alt;
    pressObj["brandMark"] = imgSrc;
  }

  const mainNewsObj = {};
  await page.waitForSelector(
    ".MediaNewsView-module__desc_left___jU94v a span img"
  );
  const mainImg = await page.$$(
    ".MediaNewsView-module__desc_left___jU94v a span img"
  );
  for (const img of mainImg) {
    const thumb = await page.evaluate((el) => el.getAttribute("src"), img);
    const title = await page.evaluate((el) => el.getAttribute("alt"), img);
    mainNewsObj["thumbImg"] = thumb;
    mainNewsObj["title"] = title;
  }

  await page.waitForSelector(
    ".MediaNewsView-module__desc_left___jU94v .MediaNewsView-module__desc_title___IObEv"
  );
  const mainNewsLink = await page.$$(
    ".MediaNewsView-module__desc_left___jU94v .MediaNewsView-module__desc_title___IObEv"
  );
  for (link of mainNewsLink) {
    const href = await page.evaluate((el) => el.getAttribute("href"), link);
    mainNewsObj["link"] = href;
  }
  pressObj["mainNews"] = mainNewsObj;

  console.log(pressObj);

  browser.close();
}

crawling();
