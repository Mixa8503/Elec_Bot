const cheerio = require('cheerio');
const request = require('request');
const axios = require('axios');

const parse = async () => {
    const getHTML = async(url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    };
    const $ = await getHTML('http://g20.k.vu/');
    console.log($.html());
};

parse();