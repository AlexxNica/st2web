import _ from 'lodash';
import React from 'react';
import { BaseTextField } from './base';

import { TextFieldWrapper } from '../wrappers';

export default class Enum extends BaseTextField {
  static icon = 'V'

  fromStateValue(v) {
    return v !== '' ? v : void 0;
  }

  toStateValue(v) {
    return v;
  }

  validate(v, spec={}) {
    const invalid = super.validate(v, spec);
    if (invalid) {
      return invalid;
    };

    return v && !_.find(spec.enum, (item) => v === item || v === item.key) && `'${v}' not in enum`;
  }

  render() {
    const { spec={} } = this.props;
    const { invalid } = this.state;

    const wrapperProps = Object.assign({}, this.props, {
      labelClass: 'st2-auto-form__select'
    });

    if (invalid) {
      wrapperProps.invalid = invalid;
    }

    const selectProps = {
      className: 'st2-auto-form__field',
      disabled: this.props.disabled,
      value: this.state.value,
      onChange: (e) => this.handleChange(e.target.value)
    };

    if (this.state.invalid) {
      selectProps.className += ' ' + 'st2-auto-form__field--invalid';
    }

    return <TextFieldWrapper {...wrapperProps} >
      <select {...selectProps} >
        {
          !spec.required && <option value='' ></option>
        }
        {
          _.map(spec.enum, (v) => {
            const props = {
              key: v,
              value: v,
              children: v
            };

            if (_.isPlainObject(v)) {
              const { key, value } = v;

              props.key = key;
              props.value = key;
              props.children = value;
            };

            return <option {...props} />;
          })
        }
      </select>
    </TextFieldWrapper>;
  }
}
