const help = '/help';

const commands = {
    start: '/start - запустити бота',
    duration: '/duration - подивитися скільки часу пройлшло з моменту виключення/включення',
    check: '/check - перевірити чи є світло'
};


module.exports = {
    positiveRecall: "Світло є!",
    negativeRecall: "Світла нема!",
    helpCommand: `Напиши ${help} щоб дізнатись усі доступні команди.`,
    helpCommands: `${commands.start}\n${commands.duration}\n${commands.check}`
};