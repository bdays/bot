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
    new actions.Input()
      .setType('users_select')
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
});
