const db = require('../../db');
const uiItems = require('../../uiItems');

function manageList(channel_id, admin_id) {
  return new Promise((resolve) => {
    const blocks = [
      new uiItems.text.Markdown().setSection('*Управление администраторами*').get(),
      new uiItems.text.Markdown()
        .setSection('Для добавления нажмите на кнопку: ', {
          accessory: uiItems.actions.button(
            'Добавить администратора',
            'add',
            `add_administrator_privileges:${channel_id}`,
            {
              style: 'primary',
            },
          ),
        })
        .get(),
    ];

    Promise.all([db.admins.list(channel_id), db.channels.getAdminId(channel_id)]).then((values) => {
      const [admins, channelCreator] = values;

      blocks.push(new uiItems.text.Markdown().setContextList([`В канале сейчас назначено (${admins.length}):`]).get());

      admins.forEach((currentAdminId, i) => {
        if (currentAdminId === admin_id) {
          blocks.push(
            new uiItems.text.Markdown()
              .setSection(`*Вы*${channelCreator === currentAdminId ? ' (Создатель канала)' : ''}`)
              .get(),
          );
          if (admins.length - 1 !== i) {
            blocks.push(uiItems.divider());
          }
          return;
        }

        const block = new uiItems.text.Markdown()
          .setSection(`<@${currentAdminId}>${channelCreator === currentAdminId ? ' (Создатель канала)' : ''}`)
          .get();

        if (channelCreator !== currentAdminId)
          block.accessory = {
            type: 'button',
            action_id: `remove_administrator_privileges:${channel_id}`,
            text: {
              type: 'plain_text',
              text: 'Снять полномочия',
            },
            style: 'danger',
            value: currentAdminId,
          };

        blocks.push(block);

        if (admins.length - 1 !== i) {
          blocks.push(uiItems.divider());
        }
      });

      resolve(blocks);
    });
  });
}

function addModal(channelId, webhookUrl) {
  return uiItems.modal.create(
    'Добавить администратора',
    `modal-add-administrator-privileges:${channelId}`,
    [
      new uiItems.actions.Input('users_select')
        .setBlockId('user_select')
        .setActionId(`add_administrator_privileges:::${webhookUrl}`)
        .setPlaceholder('Выберите пользователя')
        .setLabel('Пользователь')
        .get(),
    ],
    {},
    'Добавить',
  );
}

function errorAddAdminCurrentUser() {
  return [
    new uiItems.text.Markdown().setSection('*Ошибка добавления в список администраторов! Себя добавить нельзя!*').get(),
  ];
}

function errorRemoveAdminCurrentUser() {
  return [
    new uiItems.text.Markdown().setSection('*Ошибка снятия полномочий администратора! С себя снять нельзя!*').get(),
  ];
}

function errorAddAdmin(userId) {
  return [
    new uiItems.text.Markdown()
      .setSection(`*Ошибка добавления пользователя <@${userId}>! в список администраторов.*`)
      .get(),
  ];
}

function errorRemoveAdmin(userId) {
  return [
    new uiItems.text.Markdown()
      .setSection(`*Ошибка снятия полномочий администратора с пользователя <@${userId}>!*`)
      .get(),
  ];
}

function successAddUser(userId) {
  return [
    new uiItems.text.Markdown()
      .setSection(`Пользователь <@${userId}> успешно добавлен в список администраторов в этом канале`)
      .get(),
  ];
}

module.exports = {
  manageList,
  addModal,
  errorAddAdminCurrentUser,
  errorAddAdmin,
  successAddUser,
  errorRemoveAdmin,
  errorRemoveAdminCurrentUser,
};
