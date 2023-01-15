const help = '/help';

const commands = {
    start: '/start - запустити бота',
    duration: '/duration - подивитися скільки часу пройлшло з моменту виключення/включення',
    check: '/check - перевірити чи є світло',
    history: '/history - подивитися історію відключень/включень за якусь дату'
};

module.exports = {
    positiveRecall: "Світло є!",
    negativeRecall: "Світла нема!",
    helpCommand: `Напиши ${help} щоб дізнатись усі доступні команди.`,
    helpCommands: `${commands.start}\n${commands.duration}\n${commands.check}\n${commands.history}`,
    invalidInput: "Непправильно вказаний формат дати"
};