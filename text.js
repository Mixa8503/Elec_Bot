const help = '/help';

const commands = {
    start: '/start - запустити бота',
    duration: '/duration - подивитися скільки часу пройлшло з моменту виключення/включення',
    check: '/check - перевірити чи є світло',
    history: "/history - подивитися історію відключень/включень за якусь дату. Вводити у форматі 'ddd, DD MMM YYYY', наприклад '/history Sun, 15 Jan 2023'",
    water: "/water - дізнатися останні новини про відключення та перебої водопостачання"
};

module.exports = {
    positiveRecall: "Світло є!",
    negativeRecall: "Світла нема!",
    helpCommand: `Напиши ${help} щоб дізнатись усі доступні команди.`,
    helpCommands: `${commands.start}\n${commands.duration}\n${commands.check}\n${commands.history}\n${commands.water}`,
    invalidInput: "Неправильно вказаний формат дати або немає такої дати у графіку відключень. Вкажіть дату у форматі 'ddd, DD MMM YYYY', наприклад /history Sun, 15 Jan 2023"
};