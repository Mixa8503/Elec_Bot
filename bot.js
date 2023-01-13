'use srtict';

const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio');
const request = require('request');
const {token} = require("./token");
const { default: axios } = require('axios');
const Token = token.tok;

console.log('Bot has been started..')

const bot = new TelegramBot(Token, { polling: true });

bot.on('message', (msg) => {

    bot.sendMessage(msg.chat.id, "Hello, " + msg.from.first_name);
});