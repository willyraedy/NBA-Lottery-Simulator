import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableBody, Button, FormGroup } from 'material-ui';

import SingleSpec from './singleSpec';
import generateArray from './utils/arrayCreator';
import { getType, getSeason, getNumberOfLotteryPicks, getNumberOfSimulations, fetchSimulationResults, fetchTeamRecords } from '../store';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '80vh',
  },
  myContainer: {
    paddingRight: 40,
    paddingLeft: 40,
  },
});

function ModelSpecs({
  classes, type, season, numPicks, combos, numSims,
  handleNumPicks, handleNumSims, handleSeason, handleType, simulateModel }) {
  return (
    <FormGroup>
      <Table>
        <TableBody>
          <SingleSpec
            classes={classes}
            handleChange={handleType}
            optionArr={['Rank', 'Record']}
            paramName="type"
            val={type}
            label="Type:"
          />
          <SingleSpec
            classes={classes}
            handleChange={handleSeason}
            optionArr={generateArray(1968, 2015)}
            paramName="season"
            val={season}
            label="Season:"
          />
          <SingleSpec
            classes={classes}
            handleChange={handleNumPicks}
            optionArr={generateArray(1, 10)}
            paramName="numPicks"
            val={numPicks}
            label="Number of Lottery Picks:"
          />
          <SingleSpec
            classes={classes}
            handleChange={handleNumSims}
            optionArr={[1, 1000, 10000, 100000, 1000000]}
            paramName="numSims"
            val={numSims}
            label="Number of Simulations:"
          />
        </TableBody>
      </Table>
      <Button color="primary" className={classes.button} onClick={() => simulateModel({ type, season, numPicks, combos, numSims })}>
        Simulate
      </Button>
    </FormGroup>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    type: state.type,
    season: state.season,
    numPicks: state.numPicks,
    combos: state.combos,
    numSims: state.numSims,
  }
};

const mapDispatch = (dispatch) => {
  return {
    simulateModel: (params) => {
      dispatch(fetchSimulationResults(params))
    },
    handleType: (e) => {
      dispatch(getType(e.target.value));
    },
    handleSeason: (e) => {
      dispatch(getSeason(e.target.value));
      dispatch(fetchTeamRecords(e.target.value));
    },
    handleNumPicks: (e) => {
      dispatch(getNumberOfLotteryPicks(e.target.value));
    },
    handleNumSims: (e) => {
      dispatch(getNumberOfSimulations(e.target.value));
    },
  }
};

export default withStyles(styles)(connect(mapState, mapDispatch)(ModelSpecs));

/**
 * PROP TYPES
 */
ModelSpecs.propTypes = {
  classes: PropTypes.object.isRequired,
  simulateModel: PropTypes.func.isRequired,
  handleNumPicks: PropTypes.func.isRequired,
  handleNumSims: PropTypes.func.isRequired,
  handleSeason: PropTypes.func.isRequired,
  handleType: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  season: PropTypes.number.isRequired,
  numPicks: PropTypes.number.isRequired,
  combos: PropTypes.array.isRequired,
  numSims: PropTypes.number.isRequired,
};
