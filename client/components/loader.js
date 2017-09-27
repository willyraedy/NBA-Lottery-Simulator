// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import Frame from './frame';
import { fetchSavedLotteryModelSpecs } from '../store';

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

class Loader extends React.Component {

  componentDidMount() {
    // call thunk
    if (!this.props.savedModelId) {
      // get id
      const savedModelId = +this.props.match.params.id;
      this.props.getData(savedModelId);
    }
  }

  render() {
    const { classes, savedModelId } = this.props;
    return (
      savedModelId ? <Frame /> : <CircularProgress className={classes.progress} />
    );
  }
}

// /**
//  * CONTAINER
//  */
const mapState = (state) => {
  return {
    savedModelId: state.savedModelId,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData: (id) => {
      dispatch(fetchSavedLotteryModelSpecs(id));
    },
  };
};

export default withStyles(styles)(connect(mapState, mapDispatch)(Loader));

// /**
//  * PROP TYPES
//  */
Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  savedModelId: PropTypes.number.isRequired,
};
