const text = require('./text');

test('markdownSection', () => {
  expect(text.markdownSection()).toEqual({});

  console.log("text.markdownSection('text')", text.markdownSection('text'));

  expect(text.markdownSection('text')).toEqual({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'text',
    },
  });

  expect(text.markdownSection('text', { a: 1, b: 2 })).toEqual({
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
  expect(text.markdownContext()).toEqual({});

  expect(text.markdownContext('text')).toEqual({
    type: 'context',
    text: {
      type: 'mrkdwn',
      text: 'text',
    },
  });

  expect(text.markdownContext('text', { a: 1, b: 2 })).toEqual({
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
  expect(text.markdownContextList()).toEqual({});

  expect(text.markdownContextList(['For more info,'])).toEqual({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: 'For more info,',
      },
    ],
  });

  expect(text.markdownContextList(['For more info,'], { a: 1, b: 2 })).toEqual({
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
