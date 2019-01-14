import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LandingPage from './pages/landing-page';
import FormRendererPage from './pages/form-renderer-page';
import './styles.scss';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <MuiThemeProvider theme={ theme }>
    <Grid container spacing={ 16 }>
      <Grid item xs={ 12 }>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ LandingPage } />
            <Route exact path="/react-form-renderer" component={ FormRendererPage } />
          </Switch>
        </BrowserRouter>
      </Grid>
    </Grid>
  </MuiThemeProvider>
);

export default App;
