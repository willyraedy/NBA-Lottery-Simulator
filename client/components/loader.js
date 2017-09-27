// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import Frame from './frame';
import { getSavedLotteryModelSpecs, fetchSimulationResults } from '../store';

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

class Loader extends React.Component {

  componentDidMount() {
    if (!this.props.savedModelId) {
      const savedModelId = +this.props.match.params.id;
      const { type, season, numPicks, combos, numSims, max, shift, slope } = this.props;
      this.props.getData(savedModelId, { type, season, numPicks, combos, numSims, max, shift, slope });
    }
  }

  render() {
    const { classes, savedModelId, results } = this.props;
    return (
      savedModelId && results.length ? <Frame /> : <CircularProgress className={classes.progress} />
    );
  }
}

// /**
//  * CONTAINER
//  */
const mapState = (state) => {
  return {
    savedModelId: state.savedModelId,
    type: state.type,
    season: state.season,
    numPicks: state.numPicks,
    combos: state.combos,
    numSims: state.numSims,
    max: state.max,
    shift: state.shift,
    slope: state.slope,
    results: state.results,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData: (id, params) => {
      dispatch(getSavedLotteryModelSpecs(id))
        .then(() => {
          dispatch(fetchSimulationResults(params));
        })
        .catch(console.error);
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
