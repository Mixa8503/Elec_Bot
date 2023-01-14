// const cheerio = require('cheerio');
// const request = require('request');
// const axios = require('axios');

// request('http://g20.k.vu/', function (error, response, html) {
// if (!error && response.statusCode == 200) {
// console.log(html);
// }
// });

// const parse = async () => {
//     const getHTML = async(url) => {
//         const { data } = await axios.get(url);
//         return cheerio.load(data);
//     };
//     const $ = await getHTML('http://g20.k.vu/');
//     //1 reply markup
//     const LightStatus = $('#main > b > font').text().trim();
//     if(LightStatus === 'YES'){
//         console.log("Світло є!");
//     }
//     else{
//         console.log("Світла нема :(");
//     }

//     //2 reply markup
//     const DurationOnlineOffline = $("body > p:nth-child(8) > span").text().trim();
//     console.log(DurationOnlineOffline);
// };

// parse();