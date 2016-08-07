/* @flow */

import React from 'react';
import { Form } from 'react-redux-form';
import {
  TextInput,
  TextUnitInput,
  TextArea,
  RadioGroup,
} from './fields';

function createChildFields(rootModel, fields) {
  return fields.map((field, i) => {
    let component;
    let customProps = {};

    switch (field.class) {
      case 'textarea':
        component = TextArea;
        break;

      case 'radio':
        component = RadioGroup;
        break;

      case 'block':
        return (
          <div key={i} className="control is-grouped">
          {createChildFields(rootModel, field.children)}
          </div>
        );

      case 'textunitinput':
        component = TextUnitInput;
        break;

      case 'textinput':
      default:
        component = TextInput;
        customProps = {
          type: field.type || 'text',
        };
        break;
    }

    return React.createElement(
      component,
      {
        key: i,
        model: `${rootModel}.${field.field}`,
        label: field.label,
        ...customProps,
        ...field,
      }
    );
  });
}

export default ({
  model,
  style,
  onSubmit,
  freeze,
}: {
  model: string,
  style: Array<Object>,
  onSubmit: (record: RecordObject) => void,
  freeze: boolean,
}) => (
  <Form
    model={model}
    onSubmit={onSubmit}
  >
    {createChildFields(model, style, 'control')}

    <button type="submit" className="button is-primary" disabled={freeze}>
      Submit
    </button>
  </Form>
);
