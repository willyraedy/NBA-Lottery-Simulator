import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Navbar from './navbar';
import Frame from './frame';

/**
 * COMPONENT
 */

const theme = createMuiTheme();

function Main() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Frame />
      </div>
    </MuiThemeProvider>
  );
}

/**
 * CONTAINER
 */
const mapState = null

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);

/**
 * PROP TYPES
 */
Main.propTypes = {

};
