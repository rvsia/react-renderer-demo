import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';

const WizardStep = ({
  title,
  description,
  fields,
  formOptions,
  ...rest
}) => {
  return (
    <Fragment>
      <h5>{ title }</h5>
      <p>{ description }</p>
      { fields.map(item => formOptions.renderForm([ item ], formOptions)) }
      <WizardStepButtons
        formOptions={ formOptions }
        { ...rest }
      />
    </Fragment>
  );
};

WizardStep.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired,
  }).isRequired,
};

export default WizardStep;
