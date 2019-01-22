import React from 'react';
import Typography from '@material-ui/core/Typography';

const docsLinks = {
  mui: 'https://material-ui.com/',
  pf4: 'http://patternfly-react.surge.sh/patternfly-4/',
  pf3: 'http://patternfly-react.surge.sh/patternfly-3/index.html',
};

export default ({ activeMapper }) => <Typography>
    This component also accepts all other original props, please see <a href={ docsLinks[activeMapper] }>here</a>!
</Typography>;
