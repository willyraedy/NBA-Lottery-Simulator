// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import App from './app';
import { getSavedLotteryModelSpecs, fetchSimulationResults, getSimDirty } from '../store';

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

class SavedModelLoader extends React.Component {

  componentDidMount() {
    if (!this.props.savedModelId) {
      const savedModelId = +this.props.match.params.savedModelId;
      this.props.getData(savedModelId);
    }
  }

  render() {
    const { classes, results } = this.props;
    return (
      results.length ? <App /> : <CircularProgress className={classes.progress} />
    );
  }
}

// /**
//  * CONTAINER
//  */
const mapState = (state) => {
  return {
    results: state.results,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData: (id) => {
      dispatch(getSavedLotteryModelSpecs(id))
        .then((params) => {
          return dispatch(fetchSimulationResults(params));
        })
        .then(() => dispatch(getSimDirty(true)))
        .catch(console.error); // add error?
    },
    setPageToDirty: () => {
      dispatch(getSimDirty(true));
    },
  };
};

export default withStyles(styles)(connect(mapState, mapDispatch)(SavedModelLoader));

// /**
//  * PROP TYPES
//  */
SavedModelLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  savedModelId: PropTypes.number,
  getData: PropTypes.func.isRequired,
};
