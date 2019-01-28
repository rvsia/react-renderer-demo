import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

const SimpleNext = ({
  next,
  valid,
  handleNext,
  submit,
}) => (
  <Button
    bsStyle="primary"
    type="button"
    onClick={ () => valid ? handleNext(next) : submit() }
  >
    Continue
  </Button>
);

SimpleNext.propTypes = {
  next: PropTypes.string,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

const ConditionalNext = ({
  nextStep,
  FieldProvider,
  ...rest
}) => (
  <FieldProvider
    name={ nextStep.when }
    subscription={{ value: true }}
  >
    { ({ input: { value }}) => <SimpleNext next={ nextStep.stepMapper[value] } { ...rest } /> }
  </FieldProvider>
);

ConditionalNext.propTypes = {
  nextStep: PropTypes.shape({
    when: PropTypes.string.isRequired,
    stepMapper: PropTypes.object.isRequired,
  }).isRequired,
  FieldProvider: PropTypes.func.isRequired,
};

const submitButton = handleSubmit => <Button type="button"bsStyle="primary" onClick={ handleSubmit }>
Submit
</Button>;

const renderNextButton = ({ nextStep, handleSubmit, ...rest }) =>
  !nextStep
    ? submitButton(handleSubmit)
    : typeof nextStep === 'object'
      ? <ConditionalNext nextStep={ nextStep } { ...rest }/>
      : <SimpleNext next={ nextStep } { ...rest } />;

const WizardStepButtons = ({ formOptions, disableBack, handlePrev, nextStep, FieldProvider, handleNext }) => (
  <div className="pull-right">
    { formOptions.onCancel && (
      <Button type="button" variant="contained" color="secondary" onClick={ formOptions.onCancel }>Cancel</Button>
    ) }

    <Button type="button" variant="contained" disabled={ disableBack } onClick={ handlePrev }>Back</Button>
    { renderNextButton({
      ...formOptions,
      handleNext,
      nextStep,
      FieldProvider,
    }) }
  </div>
);

WizardStepButtons.propTypes = {
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }).isRequired,
  disableBack: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  nextStep: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      when: PropTypes.string.isRequired,
      stepMapper: PropTypes.object.isRequired,
    }),
  ]),
  FieldProvider: PropTypes.func.isRequired,
};

export default WizardStepButtons;
