const uiBlocks = require('../uiBlocks');
const uiItems = require('../uiItems');
const db = require('../db');

function checkAccess(channel_id, user_id) {
  return new Promise((resolve, reject) => {
    if (channel_id && user_id) {
      db.admins
        .checkAccess(channel_id, user_id)
        .then(() => resolve(true))
        .catch(() => {
          db.admins.list(channel_id).then((admins) => {
            reject([
              ...uiBlocks.permission.accessDeniedBlocks(),
              new uiItems.text.Markdown().setSection('*Обратитесь за доступом к одному из администраторов:*').get(),
              new uiItems.text.Markdown().setSection(admins.map((userId) => `<@${userId}>`).join(' ')).get(),
            ]);
          });
        });
    } else {
      reject(false);
    }
  });
}

module.exports = { checkAccess };
