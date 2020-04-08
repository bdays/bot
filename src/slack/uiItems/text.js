function markdownSection(text = '', args = {}) {
  if (!text) {
    console.warn('In Text markdownSection string type required');
    return {};
  }

  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: text,
    },
    ...args,
  };
}

function markdownContext(text = '', args = {}) {
  if (!text) {
    console.warn('In Text markdownContext string type required');
    return {};
  }

  return {
    type: 'context',
    text: {
      type: 'mrkdwn',
      text: text,
    },
    ...args,
  };
}

function markdownContextList(list = [], args = {}) {
  if (!list || !list.length || !Array.isArray(list)) {
    console.warn('list must be an array of strings');
    return {};
  }

  return {
    type: 'context',
    elements: list.map((text) => ({
      type: 'mrkdwn',
      text: text,
    })),
    ...args,
  };
}

module.exports = { markdownSection, markdownContext, markdownContextList };
