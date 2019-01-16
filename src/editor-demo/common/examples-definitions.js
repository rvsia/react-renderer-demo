import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

export const baseExamples = [{
  component: componentTypes.TEXT_FIELD,
  linkText: 'Text Field',
  value: { fields: [{
    component: 'text-field',
    label: 'First name',
    name: 'firts-name',
  }]},
  variants: [{
    name: 'isRequired',
    title: 'Required',
    validate: [{
      type: validatorTypes.REQUIRED,
    }]
  }, {
    title: 'Input Type',
    name: 'type',
    options: [ 'text', 'number', 'password' ],
  }],
}];
