import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableBody, Button, FormGroup, Typography } from 'material-ui';

import history from '../history';
import SingleSpec from './singleSpec';
import SingleNumberSpec from './singleNumberSpec';
import generateArray from './utils/arrayCreator';
import {
  getType,
  getSeason,
  getMax,
  getShift,
  getSlope,
  getSimDirty,
  getNumberOfLotteryPicks,
  getNumberOfSimulations,
  fetchSimulationResults,
  fetchTeamRecords,
  getSimulationResults,
  postSavedLotteryModelSpecs,
  getModelId,
  getNumberOfSeasons,
} from '../store';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  myContainer: {
    paddingRight: 40,
    paddingLeft: 40,
  },
});

function ModelSpecs({
  classes, results,
  type, season, numPicks, combos, numSims, numSeasons, max, shift, slope, savedModelId,
  handleNumPicks, handleNumSims, handleSeason, handleType, handleMax, handleShift, handleSlope, handleNumSeasons,
  simulateModel, adjustModel, saveModel,
}) {
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
            handleChange={e => handleSeason(e, numSeasons)}
            optionArr={generateArray(1968, 2015)}
            paramName="season"
            val={season}
            label="Season:"
          />
          <SingleSpec
            classes={classes}
            handleChange={e => handleNumSeasons(e, season, shift, numSeasons, slope)}
            optionArr={generateArray(0, 2)}
            paramName="numSeasons"
            val={numSeasons}
            label="Number of Previous Seasons:"
          />
          <SingleSpec
            classes={classes}
            handleChange={handleNumPicks}
            optionArr={generateArray(1, 10)}
            paramName="numPicks"
            val={numPicks}
            label="Number of Lottery Picks:"
          />
          {
            type === 'Record' ?
              [
                <SingleNumberSpec
                  key={1}
                  step={10}
                  classes={classes}
                  handleChange={handleMax}
                  val={max}
                  label="Max:"
                />,
                <SingleNumberSpec
                  key={2}
                  step={0.5}
                  classes={classes}
                  handleChange={handleShift}
                  val={shift}
                  label="Shift:"
                />,
                <SingleNumberSpec
                  key={3}
                  step={0.05}
                  classes={classes}
                  handleChange={handleSlope}
                  val={slope}
                  label="Slope:"
                />] : null
          }
          <SingleSpec
            classes={classes}
            handleChange={handleNumSims}
            optionArr={[1000, 10000, 100000]}
            paramName="numSims"
            val={numSims}
            label="Number of Simulations:"
          />
        </TableBody>
      </Table>
      {
        results.length ?
          <div>
            <Button color="primary" className={classes.button} onClick={adjustModel}>
              Adjust Model
            </Button>
            <Button color="primary" className={classes.button} onClick={() => saveModel({ type, season, numPicks, combos, numSims, max, shift, slope })}>
              Save and Share!
            </Button>
          </div> :
          <Button color="primary" className={classes.button} onClick={() => simulateModel({ type, season, numPicks, combos, numSims, max, shift, slope })}>
            Simulate
          </Button>
      }
      {
        savedModelId ?
          <Typography type="body1">{`Link to share: ${window.location.origin}/savedModel/${savedModelId}`}</Typography> : null
      }
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
    numSeasons: state.numSeasons,
    max: state.max,
    shift: state.shift,
    slope: state.slope,
    results: state.results,
    savedModelId: state.savedModelId,
  };
};

const mapDispatch = (dispatch) => {
  return {
    simulateModel: (params) => {
      dispatch(getSimDirty(true));
      dispatch(fetchSimulationResults(params));
    },
    adjustModel: () => {
      dispatch(getSimDirty(false));
      dispatch(getSimulationResults([]));
      dispatch(getModelId(null));
      history.push('/');
    },
    saveModel: (params) => {
      dispatch(postSavedLotteryModelSpecs(params))
        .then(modelId => history.push(`/savedModel/${modelId}`))
        .catch(console.error);
    },
    handleType: (e) => {
      dispatch(getType(e.target.value));
    },
    handleSeason: (e, numSeasons) => {
      dispatch(getSeason(e.target.value));
      dispatch(fetchTeamRecords(e.target.value, numSeasons));
    },
    handleNumPicks: (e) => {
      dispatch(getNumberOfLotteryPicks(e.target.value));
    },
    handleNumSims: (e) => {
      dispatch(getNumberOfSimulations(e.target.value));
    },
    handleNumSeasons: (e, season, shift, numSeasons, slope) => {
      dispatch(fetchTeamRecords(season, e.target.value))
        .then(() => dispatch(getNumberOfSeasons(e.target.value)))
        .catch(console.error)
      const difference = (e.target.value - numSeasons);
      if (difference) {
        dispatch(getShift(shift + (10 * difference)));
        dispatch(getSlope(slope - (0.075 * difference)));
      }
    },
    handleMax: (e) => {
      dispatch(getMax(e.target.value));
    },
    handleShift: (e) => {
      dispatch(getShift(+e.target.value));
    },
    handleSlope: (e) => {
      dispatch(getSlope(e.target.value));
    },
  };
};

export default withStyles(styles)(connect(mapState, mapDispatch)(ModelSpecs));

/**
 * PROP TYPES
 */
ModelSpecs.propTypes = {
  classes: PropTypes.object.isRequired,
  simulateModel: PropTypes.func.isRequired,
  adjustModel: PropTypes.func.isRequired,
  saveModel: PropTypes.func.isRequired,
  handleNumPicks: PropTypes.func.isRequired,
  handleNumSims: PropTypes.func.isRequired,
  handleNumSeasons: PropTypes.func.isRequired,
  handleSeason: PropTypes.func.isRequired,
  handleType: PropTypes.func.isRequired,
  handleMax: PropTypes.func.isRequired,
  handleShift: PropTypes.func.isRequired,
  handleSlope: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  season: PropTypes.number.isRequired,
  numPicks: PropTypes.number.isRequired,
  combos: PropTypes.array.isRequired,
  numSims: PropTypes.number.isRequired,
  numSeasons: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  shift: PropTypes.number.isRequired,
  slope: PropTypes.number.isRequired,
  savedModelId: PropTypes.number,
  results: PropTypes.array.isRequired,
};
