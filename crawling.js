const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async(url) => {
    try {
        return await axios.get(url);
    } catch(err) {
        console.log(err);
    }
}

const parsing = async(url) => {
    const html = await getHTML(url);
    console.log(html);
}

parsing('https://www.naver.com/');