class Markdown {
  constructor() {
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

module.exports = { Markdown };
