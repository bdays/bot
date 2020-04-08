const text = require('./text');

test('markdownSection', () => {
  expect(new text.Markdown().setSection().get()).toEqual({});

  expect(new text.Markdown().setSection('text').get()).toEqual({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'text',
    },
  });

  expect(new text.Markdown().setSection('text').setArgs({ a: 1, b: 2 }).get()).toEqual({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'text',
    },
    a: 1,
    b: 2,
  });
});

test('markdownContext', () => {
  expect(new text.Markdown().setContext().get()).toEqual({});

  expect(new text.Markdown().setContext('text').get()).toEqual({
    type: 'context',
    text: {
      type: 'mrkdwn',
      text: 'text',
    },
  });

  expect(new text.Markdown().setContext('text').setArgs({ a: 1, b: 2 }).get()).toEqual({
    type: 'context',
    text: {
      type: 'mrkdwn',
      text: 'text',
    },
    a: 1,
    b: 2,
  });
});

test('markdownContextList', () => {
  expect(new text.Markdown().setContextList().get()).toEqual({});

  expect(new text.Markdown().setContextList(['For more info,']).get()).toEqual({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: 'For more info,',
      },
    ],
  });

  expect(new text.Markdown().setContextList(['For more info,']).setArgs({ a: 1, b: 2 }).get()).toEqual({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: 'For more info,',
      },
    ],
    a: 1,
    b: 2,
  });
});
