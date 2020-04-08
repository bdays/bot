class Markdown {
  constructor(value) {
    this.data = {};
  }

  get() {
    return this.data;
  }

  setSection(text) {
    if (!text) {
      console.warn('In Text markdownSection string type required');
      return this;
    }

    this.data.type = 'section';
    this.data.text = {
      type: 'mrkdwn',
      text,
    };

    return this;
  }

  setContext(text) {
    if (!text) {
      console.warn('In Text markdownContext string type required');
      return this;
    }

    this.data.type = 'context';
    this.data.text = {
      type: 'mrkdwn',
      text,
    };

    return this;
  }

  setContextList(list) {
    if (!list || !list.length || !Array.isArray(list)) {
      console.warn('list must be an array of strings');
      return this;
    }

    this.data.type = 'context';
    this.data.elements = list.map((text) => ({
      type: 'mrkdwn',
      text: text,
    }));

    return this;
  }

  setArgs(args) {
    this.data = { ...this.data, ...args };
    return this;
  }
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

module.exports = { markdownContext, markdownContextList, Markdown };
