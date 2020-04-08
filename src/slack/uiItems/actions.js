function button(text, value, actionId, attr = {}) {
  if (!text || !value || !actionId) {
    console.warn('In Button required fields: text, value, actionId');
    return {};
  }

  return {
    type: 'button',
    text: {
      type: 'plain_text',
      text: text,
    },
    value,
    action_id: actionId,
    ...attr,
  };
}

class Input {
  constructor(type) {
    if (
      !['users_select', 'plain_text_input', 'multi_external_select', 'multi_static_select', 'static_select'].includes(
        type,
      )
    ) {
      console.warn('Unknown input type: ', type);
    }

    this.data = {
      type: 'input',
      element: {
        type,
      },
      label: {
        type: 'plain_text',
      },
    };
  }

  setBlockId(value) {
    this.data.block_id = value;
    return this;
  }

  setType(value) {
    this.data.element.type = value;
    return this;
  }

  setActionId(value) {
    this.data.element.action_id = value;
    return this;
  }

  Multiline() {
    this.data.element.multiline = true;
    return this;
  }

  setMinQueryLength(value) {
    this.data.element.min_query_length = value;
    return this;
  }

  setPlaceholder(value) {
    this.data.element.placeholder = {
      type: 'plain_text',
      text: value,
    };
    return this;
  }

  setLabel(value) {
    this.data.label.text = value;
    return this;
  }

  setOptions(options) {
    this.data.element.options = (options.length ? options : []).map(({ label, value }) => {
      if (!label) console.error('setOptions - not found label');
      if (!value) console.error('setOptions - not found value');

      return {
        text: {
          type: 'plain_text',
          text: label,
        },
        value,
      };
    });

    return this;
  }

  get() {
    return this.data;
  }
}

module.exports = { button, Input };
