import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import history from '../history';


import Frame from './frame';
import SavedModelLoader from './savedModelLoader';

/**
 * COMPONENT
 */

const Main = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/savedModel/:id" component={SavedModelLoader} />
        <Route path="/" component={Frame} />
      </Switch>
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
