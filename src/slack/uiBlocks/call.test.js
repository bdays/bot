const call = require('./call');
const uiItems = require('../uiItems');

test('start', () => {
  expect(call.start()).toEqual(
    new uiItems.text.Markdown().setSection('<!channel> *ВНИМАНИЕ:bangbang: Начался созвон!*').get(),
  );

  expect(call.start(1234)).toEqual(
    new uiItems.text.Markdown().setSection('<!channel> *ВНИМАНИЕ:bangbang: У <@1234> начался созвон!*').get(),
  );
});

test('remind', () => {
  expect(call.remind()).toEqual(
    new uiItems.text.Markdown().setSection('<!channel> *Идет созвон. Просьба быть тише!!!* :angry:').get(),
  );

  expect(call.remind(1234)).toEqual(
    new uiItems.text.Markdown()
      .setSection('<!channel> *<@1234> напоминает что идет созвон, и просит быть тише!!!* :angry:')
      .get(),
  );
});

test('stop', () => {
  expect(call.stop()).toEqual(
    new uiItems.text.Markdown().setSection('<!channel> *Закончился созвон!* :heavy_check_mark:').get(),
  );

  expect(call.stop(1234)).toEqual(
    new uiItems.text.Markdown().setSection('<!channel> *У <@1234> закончился созвон!* :heavy_check_mark:').get(),
  );
});
