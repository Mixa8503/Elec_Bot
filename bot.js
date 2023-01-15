'use srtict';

const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio');
const request = require('request');
const text = require('./text')
const { debug, getData} = require('./func')
const { token } = require("./token");
const { default: axios } = require('axios');
const { helpCommand, helpCommands, invalidInput } = require('./text');

const Token = token.tok;
const bot = new TelegramBot(Token, { polling: true });

console.log('Bot has been started..')

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Привіт, " + msg.from.first_name + ". " + helpCommand);
});

    const parse = async () => {
        const getHTML = async(url) => {
            const { data } = await axios.get(url);
            return cheerio.load(data);
        };
        const $ = await getHTML('http://g20.k.vu/');
        const LightStatus = $('#main > b > font').text().trim();
        const DurationOnlineOffline = $("body > p:nth-child(8) > span").text();
        const historyOnOff = $("body > details:nth-child(13) > pre").text();
        const updatedhistory = historyOnOff.split('+0200');
        const newArr = updatedhistory.map(el => el.trim()).filter(el => el !== '');

        const dates = {};
        for(const el of newArr) {
            const [ date ] = el.match(/\b\w{3}, \d{1,2} \w{3} \d{4}\b/g);
            const [ status, time ] = el.split(date).map(el => el.trim());
            if(dates[date] === undefined || null) {
                dates[date] = {};
            }
            dates[date][time] = status;
        }

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
        bot.onText(/\/history (.+)/, (msg, [source, match]) => {
            if(dates[match] != undefined){
                const out = `${match}\n${getData(match, dates)}`;
                bot.sendMessage(msg.chat.id, out);
            }
            else{
                bot.sendMessage(msg.chat.id, invalidInput);
            }
        });

        bot.onText(/\/history/, (msg) => {
            if(msg.text == '/history'){
                bot.sendMessage(msg.chat.id, invalidInput);
            }
        });
    };

    bot.onText(/\/help/, msg => {
        bot.sendMessage(msg.chat.id, helpCommands);
    });
    parse();