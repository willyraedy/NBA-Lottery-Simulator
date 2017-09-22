import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Navbar from './navbar';
import Frame from './frame';
// import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */

const theme = createMuiTheme();

function Main({ started }) {
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
const mapState = (state) => {
  return {
    started: state.started,
  };
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {

    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Main)

/**
 * PROP TYPES
 */
Main.propTypes = {
  started: PropTypes.bool,
}
