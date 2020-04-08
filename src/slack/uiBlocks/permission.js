const uiItems = require('../uiItems');

function accessDeniedBlocks() {
  return [
    new uiItems.text.Markdown().setSection(':bangbang:*Ошибка! Доступ к этому функционалу запрещен!*:lock:').get(),
  ];
}

module.exports = { accessDeniedBlocks };
