import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LandingPage from './pages/landing-page';
import FormRendererPage from './pages/form-renderer-page';
import Navigation from './common/examples-nav';
import ComponentExample from './common/example-common';
import DocPage from './common/doc-page';
import './styles.scss';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <MuiThemeProvider theme={ theme }>
    <div className="app-container">
      <div>
        <Navigation />
      </div>
      <div className="grow-1">
        <Grid container spacing={ 16 }>
          <Grid item xs={ 12 }>
            <Switch>
              <Route exact path="/" component={ LandingPage } />
              <Route exact path="/react-form-renderer" component={ FormRendererPage } />
              <Route exact path="/component-example/:component" component={ ComponentExample } />
              <Route exact path="/renderer/:component" component={ DocPage } />
              <Route exact path="/others/:component" component={ DocPage } />
            </Switch>
          </Grid>
        </Grid>
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;
