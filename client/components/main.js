import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import history from '../history';


import Frame from './frame';
import App from './app';
import SavedModelLoader from './savedModelLoader';

/**
 * COMPONENT
 */

const Main = () => {
  return (
    <Router history={history}>
      <Frame>
        <Switch>
          <Route exact path="/savedModel/:savedModelId" component={SavedModelLoader} />
          <Route path="/" component={App} />
        </Switch>
      </Frame>
    </Router>
  );
}

/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);

/**
 * PROP TYPES
 */
Main.propTypes = {

};
