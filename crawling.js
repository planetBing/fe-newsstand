const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async (url) => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const parsing = async (url) => {
  const html = await getHTML(url);
  console.log(html);
  const $ = cheerio.load(html.data);
  const $news_logo = $(".news_logo");
  //   console.log($news_logo);

  const newsLogos = [];
  $news_logo.each((idx, element) => {
    const src = $(element).attr("src");
    console.log(src);
  });
};

parsing("https://www.naver.com/");
