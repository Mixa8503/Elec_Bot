'use srtict';

const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio');
const request = require('request');
const text = require('./text')
const { token } = require("./token");
const { default: axios } = require('axios');
const { helpCommand, helpCommands } = require('./text');

const Token = token.tok;
// const url = "http://g20.k.vu/";
const bot = new TelegramBot(Token, { polling: true });

console.log('Bot has been started..')

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Привіт, " + msg.from.first_name + ". " + helpCommand);

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
                bot.sendMessage(msg.chat.id, text.positiveRecall);
            });
            bot.onText(/\/duration/, (msg) => {
                bot.sendMessage(msg.chat.id,"Світло є вже: " + DurationOnlineOffline);
            });
        }
        else{
            bot.onText(/\/check/, (msg) => {
                bot.sendMessage(msg.chat.id, text.negativeRecall);
            });
            bot.onText(/\/duration/, (msg) => {
                bot.sendMessage(msg.chat.id,"Світлa немає вже: " + DurationOnlineOffline);
            });
        }
    };

    bot.onText(/\/help/, msg => {
        bot.sendMessage(msg.chat.id, helpCommands);
    });

    bot.onText(/\/ping/, msg => {
        bot.sendMessage(msg.chat.id, "pong");
    });

    parse();
    //"body > details:nth-child(13) > pre"
});