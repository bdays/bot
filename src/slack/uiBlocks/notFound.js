const uiItems = require('../uiItems');

function commandNotFound(slash, command = '') {
  switch (slash) {
    case 'ventillation':
      return {
        blocks: [
          new uiItems.text.Markdown().setSection(`*Команда ${command ? `"${command}"` : ''} не найдена!*`).get(),
          new uiItems.text.Markdown().setSection('Доступные команды:').get(),
          new uiItems.text.Markdown().setSection('*add* - добавить время').get(),
          new uiItems.text.Markdown().setSection('*schedule* - получить расписание').get(),
        ],
      };

    case 'settings':
      return {
        blocks: [
          new uiItems.text.Markdown().setSection(`*Команда ${command ? `"${command}"` : ''} не найдена!*`).get(),
          new uiItems.text.Markdown().setSection('Доступные команды:').get(),
          new uiItems.text.Markdown().setSection('*weather* - добавить/изменить город погоды').get(),
          new uiItems.text.Markdown().setSection('*admin* - управление администраторами').get(),
        ],
      };

    default:
      return {
        blocks: [new uiItems.text.Markdown().setSection('Такой команды не существует!').get()],
      };
  }
}

module.exports = { commandNotFound };
