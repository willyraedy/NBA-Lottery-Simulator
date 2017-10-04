import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import {
  defaultCombos,
  newCombos,
  getCombos,
  getType,
  getNumberOfLotteryPicks,
  getNumberOfSeasons,
} from '../store';

const styles = theme => ({});

const Presets = ({ handleCurrent, handleNew }) => {
  return (
    <div>
      <Button color="primary" onClick={handleCurrent}>Old Lottery System</Button>
      <Button color="primary" onClick={handleNew}>New Lottery System</Button>
    </div>
  );
};

const mapState = null;

const mapDispatch = (dispatch) => {
  return {
    handleCurrent: () => {
      dispatch(getType('Rank'));
      dispatch(getNumberOfSeasons(0));
      dispatch(getNumberOfLotteryPicks(3));
      dispatch(getCombos(defaultCombos));
    },
    handleNew: () => {
      dispatch(getType('Rank'));
      dispatch(getNumberOfSeasons(0));
      dispatch(getNumberOfLotteryPicks(4));
      dispatch(getCombos(newCombos));
    },
  };
};

export default withStyles(styles)(connect(mapState, mapDispatch)(Presets));

Presets.propTypes = {
  handleCurrent: PropTypes.func.isRequired,
  handleNew: PropTypes.func.isRequired,
};
