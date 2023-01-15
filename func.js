'use strict'

function debug(obj = {}){
    return JSON.stringify(obj,null,4)
}

function getData(date, dates) {
    let res = '';
    for(const [key, value] of Object.entries(dates[date])) {
        res += `${key} - ${value}\n`;
    }
    return res;
}

module.exports = { debug, getData }