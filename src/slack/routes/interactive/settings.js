const client = require('../../client');
const api = require('../../api');
const uiItems = require('../../uiItems');

function change(view, channelId, userId) {
  const newWeatherCity = view.state.values.changeWeatherCity.actionChangeWeatherCity.value || '';

  if (!newWeatherCity || !new RegExp('^[a-zA-Zа-яА-Я]+$').test(newWeatherCity)) {
    api.chat.postEphemeral(channelId, userId, '', [
      new uiItems.text.Markdown().setSection('*Ошибка поиска города, к вводу разрешены только буквы*!').get(),
    ]);
    return;
  }

  client.settings
    .changeWeatherCityInChannel(channelId, newWeatherCity)
    .then((newCityName) => {
      api.chat.postEphemeral(channelId, userId, '', [
        new uiItems.text.Markdown().setSection(`*Город ${newCityName} успешно добавлен / изменен!*`).get(),
      ]);
    })
    .catch((e) =>
      api.chat.postEphemeral(channelId, userId, '', [
        new uiItems.text.Markdown()
          .setSection(`*Ошибка добавления / изменения города${e === 'not_found' ? ' ' + newWeatherCity : ''}!*`)
          .get(),
      ]),
    );

  return {
    response_action: 'clear',
  };
}

module.exports = { change };
