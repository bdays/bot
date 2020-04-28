const { WebClient } = require('@slack/web-api');
const env = require('../../env');
const web = new WebClient(env.getSlackToken());

function list() {
  return new Promise((resolve, reject) => {
    web.conversations
      .list()
      .then((resp) => {
        Promise.all(
          resp.channels.map(async (chan) =>
            web.conversations.members({ channel: chan.id }).then((resp) => resp.members),
          ),
        )
          .then((arr) => {
            resolve({ ...resp, channels: resp.channels.map((chan, id) => ({ ...chan, members: arr[id] })) });
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
}

module.exports = { list };
