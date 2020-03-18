const db = require('../../db');
const uiItems = require('../../uiItems');

function manageList(channel_id, admin_id) {
  return new Promise((resolve) => {
    const blocks = [
      uiItems.text.markdownSection('*Управление администраторами*'),
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Для добавления нажмите на кнопку: ',
        },
        accessory: {
          type: 'button',
          action_id: `add_administrator_privileges:${channel_id}`,
          text: {
            type: 'plain_text',
            text: 'Добавить администратора',
            emoji: true,
          },
          style: 'primary',
          value: 'add',
        },
      },
    ];

    Promise.all([db.admins.list(channel_id), db.channels.getAdminId(channel_id)]).then((values) => {
      const [admins, channelCreator] = values;

      blocks.push({
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `В канале сейчас назначено (${admins.length}):`,
          },
        ],
      });

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
              emoji: true,
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
  return {
    type: 'modal',
    callback_id: `modal-add-administrator-privileges:${channelId}`,
    title: {
      type: 'plain_text',
      text: 'Добавить администратора',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'Добавить',
      emoji: true,
    },
    close: {
      type: 'plain_text',
      text: 'Отмена',
      emoji: true,
    },
    blocks: [
      {
        block_id: `user_select`,
        type: 'input',
        element: {
          action_id: `add_administrator_privileges:::${webhookUrl}`,
          type: 'users_select',
          placeholder: {
            type: 'plain_text',
            text: 'Выберите пользователя',
            emoji: true,
          },
        },
        label: {
          type: 'plain_text',
          text: 'Пользователь',
          emoji: true,
        },
      },
    ],
  };
}

function errorAddAdminCurrentUser() {
  return [uiItems.text.markdownSection('*Ошибка добавления в список администраторов! Себя добавить нельзя!*')];
}

function errorRemoveAdminCurrentUser() {
  return [uiItems.text.markdownSection('*Ошибка снятия полномочий администратора! С себя снять нельзя!*')];
}

function errorAddAdmin(userId) {
  return [uiItems.text.markdownSection(`*Ошибка добавления пользователя <@${userId}>! в список администраторв*`)];
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
