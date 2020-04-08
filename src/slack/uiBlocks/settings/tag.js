const uiItems = require('../../uiItems');

function successAdded(tagName) {
  return uiItems.text.markdownSection(`*Тег _${tagName}_ был успешно добавлен*`);
}

function errorAddedDuplicate(tagName) {
  return uiItems.text.markdownSection(`*Ошибка добавления тега _${tagName}_, он уже существует!*`);
}

function errorAdded(tagName) {
  return uiItems.text.markdownSection(`*Ошибка добавления тега _${tagName}_!*`);
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
      uiItems.text.markdownSection(
        '*Внимание! Удалить или изменить тег будет невозможно!* _и он будет сохранен в нижнем регистре_',
      ),
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
