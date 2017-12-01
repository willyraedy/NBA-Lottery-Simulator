import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import history from '../history';


import Frame from './frame';
import App from './app';
import SavedModelLoader from './savedModelLoader';
import Tutorial from './tutorial';

/**
 * COMPONENT
 */

const Main = () => {
  return (
    <Router history={history}>
      <Frame>
        <Switch>
          <Route exact path="/tutorial" component={Tutorial} />
          <Route exact path="/savedModel/:savedModelId" component={SavedModelLoader} />
          <Route path="/" component={App} />
        </Switch>
      </Frame>
    </Router>
  );
};

export default Main;

