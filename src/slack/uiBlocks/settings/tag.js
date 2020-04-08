const uiItems = require('../../uiItems');

function successAdded(tagName) {
  return new uiItems.text.Markdown().setSection(`*Тег _${tagName}_ был успешно добавлен*`).get();
}

function errorAddedDuplicate(tagName) {
  return new uiItems.text.Markdown().setSection(`*Ошибка добавления тега _${tagName}_, он уже существует!*`).get();
}

function errorAdded(tagName) {
  return new uiItems.text.Markdown().setSection(`*Ошибка добавления тега _${tagName}_!*`).get();
}

/**
 * Модальное окно для добавления тега
 *
 * @param {String} channelId
 */
function addModal(channelId) {
  return uiItems.modal.create(
    'Добавление нового тега',
    `modal-settings-tag-add:${channelId}`,
    [
      new uiItems.text.Markdown()
        .setSection('*Внимание! Удалить или изменить тег будет невозможно!* _и он будет сохранен в нижнем регистре_')
        .get(),
      new uiItems.actions.Input('plain_text_input')
        .setBlockId('tagName')
        .setActionId('actionTagName')
        .setPlaceholder('Введите название')
        .setLabel('Название')
        .get(),
    ],
    {},
    'Добавить',
  );
}

module.exports = { addModal, successAdded, errorAddedDuplicate, errorAdded };
