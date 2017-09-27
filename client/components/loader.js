// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import Frame from './frame';
import { getSavedLotteryModelSpecs } from '../store';

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

class Loader extends React.Component {

  componentDidMount() {
    // call thunk
    console.log('Saved model Id', this.props.savedModelId)
    if (!this.props.savedModelId) {
      const savedModelId = +this.props.match.params.id;
      console.log('Url Id: ', savedModelId)
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
      console.log('Fetch runs');
      dispatch(getSavedLotteryModelSpecs(id));
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
  getData: PropTypes.func.isRequired,
};
