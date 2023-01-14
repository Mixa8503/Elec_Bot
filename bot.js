'use srtict';

const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio');
const request = require('request');
const temp = require('./temp')
const { token } = require("./token");
const { default: axios } = require('axios');

const Token = token.tok;
// const url = "http://g20.k.vu/";
const bot = new TelegramBot(Token, { polling: true });

console.log('Bot has been started..')

const parse = async () => {
    const getHTML = async(url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    };
    const $ = await getHTML('http://g20.k.vu/');
    const LightStatus = $('#main > b > font').text().trim();
    const DurationOnlineOffline = $("body > p:nth-child(8) > span").text();

    if(LightStatus === 'YES'){
        bot.onText(/\/check/, (msg) => {
            // const { id } = msg.chat;
            bot.sendMessage(msg.chat.id, "Світло є!");
        });
    }
    else{
        bot.onText(/\/check/, (msg) => {
            bot.sendMessage(msg.chat.id, "Світла нема!");
        });
    }

    bot.onText(/\/duration/, (msg) => {
        bot.sendMessage(msg.chat.id, DurationOnlineOffline);
    });
};

parse();

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Hello, " + msg.from.first_name);
});

bot.onText(/\/ping/, msg => {
    const { id } = msg.chat;
    bot.sendMessage(id, "pong");
});