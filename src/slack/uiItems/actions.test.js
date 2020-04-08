const actions = require('./actions');

test('button', () => {
  expect(actions.button()).toEqual({});

  expect(actions.button('title', 'value', 'actionId')).toEqual({
    type: 'button',
    text: {
      type: 'plain_text',
      text: 'title',
    },
    value: 'value',
    action_id: 'actionId',
  });

  expect(actions.button('title', 'value', 'actionId', { a: 1, b: 2 })).toEqual({
    type: 'button',
    text: {
      type: 'plain_text',
      text: 'title',
    },
    value: 'value',
    action_id: 'actionId',
    a: 1,
    b: 2,
  });
});

test('inputPlainText', () => {
  console.log(actions);

  expect(
    new actions.Input('users_select')
      .setBlockId('user_select')
      .setActionId('add_administrator_privileges:::123')
      .setPlaceholder('Выберите пользователя')
      .setLabel('Пользователь')
      .get(),
  ).toEqual({
    block_id: `user_select`,
    type: 'input',
    element: {
      action_id: `add_administrator_privileges:::123`,
      type: 'users_select',
      placeholder: {
        type: 'plain_text',
        text: 'Выберите пользователя',
      },
    },
    label: {
      type: 'plain_text',
      text: 'Пользователь',
    },
  });

  expect(
    new actions.Input('plain_text_input')
      .setBlockId('tagName')
      .setActionId('actionTagName')
      .setPlaceholder('Введите название')
      .setLabel('Название')
      .Multiline()
      .get(),
  ).toEqual({
    type: 'input',
    block_id: 'tagName',
    element: {
      multiline: true,
      action_id: 'actionTagName',
      placeholder: {
        type: 'plain_text',
        text: 'Введите название',
      },
      type: 'plain_text_input',
    },
    label: {
      type: 'plain_text',
      text: 'Название',
    },
  });

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
  ).toEqual({
    type: 'input',
    block_id: 'changeWeatherCity',
    element: {
      min_query_length: 2,
      placeholder: {
        type: 'plain_text',
        text: 'Введите название города',
      },
      type: 'plain_text_input',
      action_id: 'actionChangeWeatherCity',
      options: [
        {
          text: {
            type: 'plain_text',
            text: 'label1',
          },
          value: 'value1',
        },
        {
          text: {
            type: 'plain_text',
            text: 'label2',
          },
          value: 'value2',
        },
      ],
    },
    label: {
      type: 'plain_text',
      text: 'Город',
    },
  });
});
