import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Typography, Button, AppBar, Toolbar } from 'material-ui';
import { withRouter } from 'react-router';

import Navbar from './navbar';
import { removeError } from '../store';

const styles = theme => ({
  // errorBar: {
  //   display: 'flex',
  //   backgroundColor: 'red',
  //   textAlign: 'center',
  //   justifyContent: 'space-between',
  // },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflowX: 'scroll',
  },
  myContainer: {
    paddingRight: 40,
    paddingLeft: 40,
  },
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  colorDefault: {
    backgroundColor: 'orange',
  },
  errorMessage: {
    color: 'white',
    flex: 1,
  },
  errorButton: {
    color: 'white',
  },
});

const Frame = (props) => {
  const { classes, error, handleError, children } = props;
  return (
    <div>
      <Navbar />
      {
        error ?
          <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.colorDefault} >
              <Toolbar>
                <Typography type="subheading" className={classes.errorMessage}>
                  {`Woops! Something went wrong: ${error.message}`}
                </Typography>
                <Button onClick={handleError} className={classes.errorButton} >Close</Button>
              </Toolbar>
            </AppBar>
          </div> : null
      }
      { children }
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    error: state.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleError: () => dispatch(removeError()),
  };
};

export default withRouter(withStyles(styles)(connect(mapState, mapDispatch)(Frame)));

/**
 * PROP TYPES
 */
Frame.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object,
  handleError: PropTypes.func.isRequired,
};
