const { Model, DataTypes } = require('sequelize');
const config = require('./config');
const utils = require('../utils');
const env = require('../env');

class Weather extends Model {}
Weather.init(
  {
    city_name: DataTypes.STRING,
    temp: DataTypes.NUMBER,
    temp_feels_like: DataTypes.NUMBER,
    wind_speed: DataTypes.NUMBER,
    wind_deg: DataTypes.NUMBER,
    dt: DataTypes.NUMBER,
    last_update: DataTypes.NUMBER,
  },
  { sequelize: config.db(), modelName: 'weather' },
);

/**
 *
 *
 * @param {string} city_name
 * @returns {Promise}
 */
function add(city_name) {
  return new Promise((resolve, reject) => {
    if (!city_name) {
      reject('invalid data');
      return;
    }

    utils.weather
      .get(city_name)
      .then((resp) => {
        Weather.count({ where: { city_name: resp.city_name } })
          .then((count) => {
            if (count != 0) {
              resolve(resp.city_name);
            } else {
              Weather.create({ ...resp })
                .then(() => resolve(resp.city_name))
                .catch(reject);
            }
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

/**
 *
 *
 * @returns {Promise}
 */
function updateAll() {
  return new Promise((resolve, reject) => {
    Weather.sync()
      .then(() => {
        Weather.findAll()
          .then((records) => {
            Promise.all([
              ...records.map((element) =>
                utils.weather
                  .get(element.toJSON().city_name)
                  .catch((e) => utils.logger.logDb().error('weather updateAll:', e)),
              ),
            ])
              .then((data) => {
                Promise.all([
                  ...data.map((item) => {
                    if (item && item.city_name) {
                      return Weather.update(item, { where: { city_name: item.city_name } }).catch((e) =>
                        utils.logger.logDb().error('weather updateAll:', e),
                      );
                    }
                  }),
                ])
                  .then(() => resolve('ok'))
                  .catch(reject);
              })
              .catch(reject);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

function updateAllWatcher() {
  let lastTime = new Date();

  updateAll();

  setInterval(() => {
    const currentTime = new Date();
    if (currentTime - lastTime >= env.getWeatherInterval()) {
      lastTime = currentTime;
      updateAll();
    }
  }, 5000);
}

/**
 *
 *
 * @param {string} city_name
 * @returns {Promise}
 */
function get(city_name) {
  return new Promise((resolve, reject) => {
    Weather.findOne({ where: { city_name } })
      .then((item) => {
        if (item && item.toJSON()) resolve(item.toJSON());

        reject('not found');
      })
      .catch(reject);
  });
}

module.exports = { add, updateAll, get, updateAllWatcher };