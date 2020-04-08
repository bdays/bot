const utils = require('../../utils');
const dbApp = require('../../db');
const uiItems = require('../uiItems');

function get(city) {
  return new Promise((resolve) => {
    dbApp.weather
      .get(city)
      .then((r) => {
        resolve(
          new uiItems.text.Markdown()
            .setSection(
              `За окном :cityscape: ${r.city_name} :thermometer: ${r.temp} °C, ощущается как ${
                r.temp_feels_like
              } °C, :tornado_cloud: *${utils.weather.degToCompass(r.wind_deg)}* ${r.wind_speed} м/c${
                utils.date.printDate(r.last_update) ? `. _Обновлено ${utils.date.printDate(r.last_update)} по GMT_` : ''
              }`,
            )
            .get(),
        );
      })
      .catch(() =>
        resolve(
          new uiItems.text.Markdown().setSection(':thermometer:Для канала не найден город для запроса погоды!').get(),
        ),
      );
  });
}

module.exports = { get };
