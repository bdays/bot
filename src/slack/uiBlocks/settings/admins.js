const db = require('../../db');
const uiItems = require('../../uiItems');

function manageList(channel_id, admin_id) {
  return new Promise((resolve) => {
    const blocks = [
      uiItems.text.markdownSection('*Управление администраторами*'),
      uiItems.text.markdownSection('Для добавления нажмите на кнопку: ', {
        accessory: uiItems.actions.button(
          'Добавить администратора',
          'add',
          `add_administrator_privileges:${channel_id}`,
          {
            style: 'primary',
          },
        ),
      }),
    ];

    Promise.all([db.admins.list(channel_id), db.channels.getAdminId(channel_id)]).then((values) => {
      const [admins, channelCreator] = values;

      blocks.push(uiItems.text.markdownContextList([`В канале сейчас назначено (${admins.length}):`]));

      admins.forEach((currentAdminId, i) => {
        if (currentAdminId === admin_id) {
          blocks.push(
            uiItems.text.markdownSection(`*Вы*${channelCreator === currentAdminId ? ' (Создатель канала)' : ''}`),
          );
          if (admins.length - 1 !== i) {
            blocks.push(uiItems.divider());
          }
          return;
        }

        const block = uiItems.text.markdownSection(
          `<@${currentAdminId}>${channelCreator === currentAdminId ? ' (Создатель канала)' : ''}`,
        );

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
      new actions.Input()
        .setType('users_select')
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
  return [uiItems.text.markdownSection('*Ошибка добавления в список администраторов! Себя добавить нельзя!*')];
}

function errorRemoveAdminCurrentUser() {
  return [uiItems.text.markdownSection('*Ошибка снятия полномочий администратора! С себя снять нельзя!*')];
}

function errorAddAdmin(userId) {
  return [uiItems.text.markdownSection(`*Ошибка добавления пользователя <@${userId}>! в список администраторов.*`)];
}

function errorRemoveAdmin(userId) {
  return [uiItems.text.markdownSection(`*Ошибка снятия полномочий администратора с пользователя <@${userId}>!*`)];
}

function successAddUser(userId) {
  return [
    uiItems.text.markdownSection(`Пользователь <@${userId}> успешно добавлен в список администраторов в этом канале`),
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
