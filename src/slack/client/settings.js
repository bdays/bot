const axios = require('axios');
const uiBlocks = require('../uiBlocks');
const dbApp = require('../../db');
const db = require('../db');
const api = require('../api');
const uiItems = require('../uiItems');

function openChangeWeatherModal(channel_id, trigger_id) {
  uiBlocks.settings.weather.changeModal(channel_id).then((view) => {
    api.views.open(trigger_id, view);
  });
}

function openAddTagModal(channel_id, trigger_id) {
  api.views.open(trigger_id, uiBlocks.settings.tag.addModal(channel_id));
}

function openAddAdministartorModal(channel_id, trigger_id, webhookUrl) {
  api.views.open(trigger_id, uiBlocks.settings.admins.addModal(channel_id, webhookUrl));
}

function changeWeatherCityInChannel(channelId, newWeatherCity) {
  return new Promise((resolve, reject) => {
    if (newWeatherCity) {
      dbApp.weather
        .add(newWeatherCity)
        .then((newCityName) => {
          db.channels
            .changeWeatherCity(channelId, newCityName)
            .then((resp) => {
              resolve(newCityName);
            })
            .catch((e) => reject(''));
        })
        .catch(() => reject('not_found'));
      return;
    }
    reject('');
  });
}

function errorAddCurrentUserAdmin(channelId, userId) {
  api.chat.postEphemeral(channelId, userId, '', uiBlocks.settings.admins.errorAddAdminCurrentUser());
}

function addUserAdmin(channelId, selectedUserId, adminId, webhookUrl) {
  db.admins
    .add(channelId, selectedUserId)
    .then(() => {
      uiBlocks.settings.admins.manageList(channelId, adminId).then((blocks) =>
        axios.post(webhookUrl, {
          replace_original: 'true',
          blocks,
        }),
      );

      api.chat.postMessage(selectedUserId, '', [
        new uiItems.text.Markdown()
          .setSection(`<@${adminId}> выдал Вам полномочия администратора в канале <#${channelId}>`)
          .get(),
      ]);
    })
    .catch((e) => {
      api.chat.postEphemeral(channelId, adminId, '', uiBlocks.settings.admins.errorAddAdmin(selectedUserId));
    });
}

function removeAdmin(channelId, userId, needRemoveUserId, webhookUrl) {
  if (userId === needRemoveUserId) {
    api.chat.postEphemeral(channelId, userId, '', uiBlocks.settings.admins.errorRemoveAdminCurrentUser());
    return;
  }

  db.admins
    .remove(channelId, needRemoveUserId)
    .then(() => {
      uiBlocks.settings.admins.manageList(channelId, userId).then((blocks) =>
        axios.post(webhookUrl, {
          replace_original: 'true',
          blocks,
        }),
      );

      api.chat.postMessage(needRemoveUserId, '', [
        new uiItems.text.Markdown()
          .setSection(`<@${userId}> снял с Вас полномочия администратора в канале <#${channelId}>`)
          .get(),
      ]);
    })
    .catch(() =>
      api.chat.postEphemeral(channelId, userId, '', uiBlocks.settings.admins.errorRemoveAdmin(needRemoveUserId)),
    );
}

module.exports = {
  openChangeWeatherModal,
  changeWeatherCityInChannel,
  openAddAdministartorModal,
  errorAddCurrentUserAdmin,
  addUserAdmin,
  removeAdmin,
  openAddTagModal,
};
