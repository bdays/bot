const permission = require('./permission');
const uiItems = require('../uiItems');

test('accessDeniedBlocks', () => {
  expect(permission.accessDeniedBlocks()).toEqual([
    new uiItems.text.Markdown().setSection(':bangbang:*Ошибка! Доступ к этому функционалу запрещен!*:lock:').get(),
  ]);
});
