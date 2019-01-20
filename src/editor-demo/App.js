import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LandingPage from './pages/landing-page';
import FormRendererPage from './pages/form-renderer-page';
import Navigation from './common/examples-nav';
import ComponentExample from './common/example-common';
import './styles.scss';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <MuiThemeProvider theme={ theme }>
    <Grid container spacing={ 16 }>
      <Grid item xs={ 2 }>
        <Navigation />
      </Grid>
      <Grid item xs={ 10 }>
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route exact path="/react-form-renderer" component={ FormRendererPage } />
          <Route exact path="/component-example/:component" component={ ComponentExample } />
        </Switch>
      </Grid>
    </Grid>
  </MuiThemeProvider>
);

export default App;
