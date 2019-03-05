import GetStartedText from './doc-texts/get-started';
import InstallationText from './doc-texts/installation';
import FormSchemasText from './doc-texts/form-schemas';
import ComponentMappingText from './doc-texts/component-mapping';
import Condition from './doc-texts/condition';

export const docs = [{
  component: 'installation',
  linkText: 'Installation',
  contentText: InstallationText,
}, {
  component: 'get-started',
  linkText: 'Getting started',
  contentText: GetStartedText,
}, {
  component: 'form-schemas',
  linkText: 'Form schemas',
  contentText: FormSchemasText,
}, {
  component: 'component-mapping',
  linkText: 'Component mapping',
  contentText: ComponentMappingText,
}, {
  component: 'conditions',
  linkText: 'Conditional fields',
  contentText: Condition,
}];
