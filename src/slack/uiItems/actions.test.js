const actions = require('./actions');
const buttonMock = require('./mockJSON/actions/buttonMock.json');
const inputMock = require('./mockJSON/actions/inputMock.json');

test('button', () => {
  expect(actions.button()).toEqual({});

  expect(actions.button('title', 'value', 'actionId')).toEqual(buttonMock['1']);

  expect(actions.button('title', 'value', 'actionId', { a: 1, b: 2 })).toEqual(buttonMock['2']);
});

test('Input', () => {
  expect(
    new actions.Input('users_select')
      .setBlockId('user_select')
      .setActionId('add_administrator_privileges:::123')
      .setPlaceholder('Выберите пользователя')
      .setLabel('Пользователь')
      .get(),
  ).toEqual(inputMock['1']);

  expect(
    new actions.Input('plain_text_input')
      .setBlockId('tagName')
      .setActionId('actionTagName')
      .setPlaceholder('Введите название')
      .setLabel('Название')
      .Multiline()
      .get(),
  ).toEqual(inputMock['2']);

  expect(
    new actions.Input('plain_text_input')
      .setBlockId('changeWeatherCity')
      .setActionId('actionChangeWeatherCity')
      .setPlaceholder('Введите название города')
      .setLabel('Город')
      .setMinQueryLength(2)
      .setOptions([
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
      ])
      .get(),
  ).toEqual(inputMock['3']);
});
