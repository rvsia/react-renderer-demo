import React, { Fragment } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Routes from './routes';

const Navigation = () => (
  <div>
    <NavLink to="/"><span>Home page</span></NavLink>
    <NavLink to="/pf3-mapper"><span>Pf 3 mapper</span></NavLink>
    <NavLink to="/pf4-mapper"><span>Pf 4 mapper</span></NavLink>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Fragment>
      <div>Data driven forms</div>
      <Navigation />
      <Routes />
    </Fragment>
  </BrowserRouter>
);

export default App;
