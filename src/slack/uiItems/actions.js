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
  constructor(params) {
    this.data = {
      type: 'input',
      element: {},
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
    if (
      !['users_select', 'plain_text_input', 'multi_external_select', 'multi_static_select', 'static_select'].includes(
        value,
      )
    ) {
      console.warn('Unknown input type: ', value);
    }

    this.data.element.type = value;
    return this;
  }

  setActionId(value) {
    this.data.element.action_id = value;
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

  get() {
    return this.data;
  }
}

module.exports = { button, Input };
