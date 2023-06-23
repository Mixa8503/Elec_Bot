'use strict';

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const { debug, getData } = require('./func');
const cheerio = require('cheerio');
const https = require('https');
const { token } = require('./token');
const { helpCommand, helpCommands, invalidInput } = require('./text');

const Token = token.tok;
const bot = new TelegramBot(Token, { polling: true });

console.log('Bot has been started..');

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Привіт, ${msg.from.first_name}. ${helpCommand}`);
});

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const websites = [
  {
    name: 'Electricity',
    url: 'http://g20.k.vu/',
    parse: async () => {
      const { data } = await axiosInstance.get(websites[0].url);
      const $ = cheerio.load(data);
      const lightStatus = $('#main > b > font').text().trim();
      const durationOnlineOffline = $('span.v').text();
      const historyOnOff = $('body > details > pre').text();
      const updatedhistory = historyOnOff.split('+0200');
      const newArr = updatedhistory.map(el => el.trim()).filter(el => el !== '');

      const dates = {};
      for (const el of newArr) {
        const [date] = el.match(/\b\w{3}, \d{1,2} \w{3} \d{4}\b/g);
        const [status, time] = el.split(date).map(el => el.trim());
        if (dates[date] === undefined || null) {
          dates[date] = {};
        }
        dates[date][time] = status;
      }

      return {
        lightStatus,
        durationOnlineOffline,
        dates
      };
    }
  },
  {
    name: 'Water',
    url: 'https://vodokanal.kiev.ua/avarijna-sluzhba-1581/',
    parse: async () => {
      const { data } = await axiosInstance.get(websites[1].url);
      const $ = cheerio.load(data);
      const WaterNews = $("body > div > main > div > div > div.col-lg-9.col-md-9.col-sm-9.col-xs-12 > div > div > div.p-description > div:nth-child(6)").text();
      return {
        WaterNews
      };
    }
  }
];

websites.forEach((website) => {
    bot.onText(/\/check/, async (msg) => {
    const { lightStatus, durationOnlineOffline } = await website.parse();
    let message;
    if (lightStatus === 'YES') {
    message = `Світло є вже: ${durationOnlineOffline}`;
    } else {
    message = `Світлa немає вже: ${durationOnlineOffline}`;
    }
      bot.sendMessage(msg.chat.id, message);
    });
  
    bot.onText(/\/duration/, async (msg) => {
      const { durationOnlineOffline } = await website.parse();
      bot.sendMessage(msg.chat.id, `Duration: ${durationOnlineOffline}`);
    });
  });

  bot.onText(/\/history (.+)/, async (msg, match) => {
    const { dates } = await website.parse();
    if (dates[match[1]] !== undefined) {
      const out = `${match[1]}\n${getData(match[1], dates)}`;
      bot.sendMessage(msg.chat.id, out);
    } else {
      bot.sendMessage(msg.chat.id, invalidInput);
    }
  });

bot.onText(/\/water/, async (msg) => {
  const { WaterNews } = await websites[1].parse();
  bot.sendMessage(msg.chat.id, WaterNews);
});

bot.onText(/\/history/, (msg) => {
  bot.sendMessage(msg.chat.id, invalidInput);
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, helpCommands);
});




