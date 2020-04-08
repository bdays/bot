const db = require('../../db');
const uiItems = require('../../uiItems');

/**
 * Модальное окно для добавления / изменения города погоды в канале
 *
 * @param {String} channelId
 * @returns Promise
 */
function changeModal(channelId) {
  return new Promise((resolve) => {
    const modal = uiItems.modal.create(
      'Изменение города погоды',
      `modal-settings-weather-change:${channelId}`,
      [
        new uiItems.actions.Input('plain_text_input')
          .setBlockId('changeWeatherCity')
          .setActionId('actionChangeWeatherCity')
          .setPlaceholder('Введите название города')
          .setLabel('Город')
          .get(),
      ],
      {},
      'Добавить / Изменить',
    );

    db.channels
      .getWeatherCity(channelId)
      .then((weather_city) => {
        if (weather_city)
          modal.blocks.unshift(new uiItems.text.Markdown().setSection(`*Текущий город:* ${weather_city}`).get());
        resolve(modal);
      })
      .catch(() => resolve(modal));
  });
}

module.exports = { changeModal };
