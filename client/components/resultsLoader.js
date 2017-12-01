// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import ModelResults from './modelResults';

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

const ResultsLoader = ({ results, classes }) => {
  return (
    results.length ? <ModelResults /> : <CircularProgress className={classes.progress} />
  );
}

// /**
//  * CONTAINER
//  */
const mapState = (state) => {
  return {
    results: state.results,
  };
};

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(ResultsLoader));

// /**
//  * PROP TYPES
//  */
ResultsLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
};
