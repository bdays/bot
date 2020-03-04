const { Model, DataTypes } = require('sequelize');
const config = require('./config');

class Channels extends Model {}
Channels.init(
  {
    channel_id: DataTypes.STRING,
    name: DataTypes.STRING,
    name_normalized: DataTypes.STRING,
    is_channel: DataTypes.BOOLEAN,
    wheather_city: DataTypes.STRING,
    creator: DataTypes.STRING,
    members: DataTypes.STRING,
  },
  { sequelize: config.db(), modelName: 'channels' },
);

/**
 *
 *
 * @param {string} channel_id
 * @param {string} name
 * @param {string} name_normalized
 * @param {boolean} is_channel
 * @param {string} creator
 * @param {Array.<String>} members
 * @returns {Promise}
 */
function add(channel_id, name, name_normalized, is_channel, creator, members = []) {
  return new Promise((resolve, reject) => {
    if (!channel_id || !name || !name_normalized || !is_channel || !creator || !members) {
      reject('invalid data');
      return;
    }

    let membersString = '';

    try {
      membersString = JSON.stringify(members);
    } catch (e) {
      reject(e);
      return;
    }

    Channels.sync().then(() => {
      Channels.count({ where: { channel_id } }).then((count) => {
        if (count != 0) {
          reject('Author already exists');
        } else {
          Channels.sync()
            .then(() =>
              Channels.create({
                channel_id,
                name,
                name_normalized,
                is_channel,
                creator,
                members: membersString,
              }),
            )
            .then(() => {
              resolve();
            })
            .catch((e) => reject(e));
        }
      });
    });
  });
}

function changeWeatherCity(channel_id, wheather_city) {
  return new Promise((resolve, reject) => {
    Channels.findOne({ where: { channel_id } })
      .then((record) => {
        if (record) {
          record
            .update({
              wheather_city,
            })
            .then(() => resolve('success'));
        } else {
          reject('error update city');
        }
      })
      .catch(() => reject('error find city'));
  });
}

function getWeatherCity(channel_id) {
  return new Promise((resolve) => {
    Channels.findOne({ where: { channel_id } })
      .then((record) => resolve(record.toJSON().wheather_city || ''))
      .catch(() => resolve(''));
  });
}

module.exports = { add, changeWeatherCity, getWeatherCity };
