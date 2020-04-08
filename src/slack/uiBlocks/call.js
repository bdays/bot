const uiItems = require('../uiItems');

function start(userId) {
  return new uiItems.text.Markdown()
    .setSection(`<!channel> *ВНИМАНИЕ:bangbang: ${userId ? `У <@${userId}> н` : 'Н'}ачался созвон!*`)
    .get();
}

function remind(userId) {
  return new uiItems.text.Markdown()
    .setSection(
      userId
        ? `<!channel> *<@${userId}> напоминает что идет созвон, и просит быть тише!!!* :angry:`
        : '<!channel> *Идет созвон. Просьба быть тише!!!* :angry:',
    )
    .get();
}

function stop(userId) {
  return new uiItems.text.Markdown()
    .setSection(`<!channel> *${userId ? `У <@${userId}> з` : 'З'}акончился созвон!* :heavy_check_mark:`)
    .get();
}

module.exports = { start, remind, stop };
