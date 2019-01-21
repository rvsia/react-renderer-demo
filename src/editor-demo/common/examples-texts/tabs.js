import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

export default () =>
  <Fragment>
    <Typography variant="body1">
  For using this component, you have to append TabItem component (containing form fields) to fields property.
    </Typography>
    <Typography variant="h6" gutterBottom>
    Component constant
    </Typography>
    <pre>TAB_ITEM</pre> <Typography variant="body1">as an import from componentTypes</Typography>
    <pre>tab-item</pre> <Typography variant="body1">as a string</Typography>
  </Fragment>;
