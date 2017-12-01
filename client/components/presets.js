import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import {
  oldCombos,
  newCombos,
  getCombos,
  getType,
  getNumberOfLotteryPicks,
  getNumberOfSeasons,
} from '../store';

const Presets = ({ handleCurrent, handleNew, numOfLotteryTeams }) => {
  return (
    <div>
      <Button color="primary" onClick={() => handleCurrent(numOfLotteryTeams)}>Old System</Button>
      <Button color="primary" onClick={() => handleNew(numOfLotteryTeams)}>New System</Button>
    </div>
  );
};

const mapState = (state) => {
  return {
    numOfLotteryTeams: Object.keys(state.teamRecords)
      .filter(team => state.teamRecords[team] && state.teamRecords[team] < 1000)
      .length - 16,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleCurrent: (numTeams) => {
      dispatch(getType('Rank'));
      dispatch(getNumberOfSeasons(0));
      dispatch(getNumberOfLotteryPicks(3));
      dispatch(getCombos(oldCombos.slice(0, numTeams)));
    },
    handleNew: (numTeams) => {
      dispatch(getType('Rank'));
      dispatch(getNumberOfSeasons(0));
      dispatch(getNumberOfLotteryPicks(4));
      dispatch(getCombos(newCombos.slice(0, numTeams)));
    },
  };
};

export default connect(mapState, mapDispatch)(Presets);

Presets.propTypes = {
  handleCurrent: PropTypes.func.isRequired,
  handleNew: PropTypes.func.isRequired,
  numOfLotteryTeams: PropTypes.number.isRequired,
};
