import React from 'react';
import Typography from '@material-ui/core/Typography';

const docsLinks = {
  mui: 'https://material-ui.com/',
  pf4: 'http://patternfly-react.surge.sh/patternfly-4/components/',
  pf3: 'http://patternfly-react.surge.sh/patternfly-3/index.html',
};

export default ({ activeMapper, component }) => {
  if (activeMapper === 'pf4'){
    switch (component){
      case 'date-picker':
        component = 'textinput';
        break;
      case 'select-field':
        component = 'select';
        break;
      case 'switch-field':
        component = 'switch';
        break;
      case 'textarea-field':
        component = 'textarea';
        break;
      case 'text-field':
        component = 'textinput';
        break;
      case 'time-picker':
        component = 'textinput';
        break;
    }
  }

  return <Typography>
    This component also accepts all other original props, please see <a href={ `${docsLinks[activeMapper]}${ activeMapper === 'pf4' ? component : '' }` }>here</a>!
  </Typography>;};
