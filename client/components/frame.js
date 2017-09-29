import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Paper, Typography } from 'material-ui';

import Navbar from './navbar';
import ModelSpecs from './modelSpecs';
import Presets from './presets';
import ResultsLoader from './resultsLoader';
import ComboGraph from './comboGraph';
import Combos from './combos';
import TeamRecords from './teamRecords';

const styles = theme => ({
  root: {
    marginTop: 30,
    display: 'flex',
  },
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
});

const Frame = ({ classes, results, type, simDirty }) => {
  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <div className="specs-wrapper">
          <div className="column column-4of4">
            <Paper className={classes.paper}>
              <Typography type="subheading">LOTTERY SYSTEM SPECS</Typography>
              <ModelSpecs />
            </Paper>
          </div>
          {
            !simDirty ?
              <div className="column column-4of4">
                <Paper className={classes.paper}>
                  <Typography type="subheading">PRESET LEAGUE SYSTEMS</Typography>
                  <Presets />
                </Paper>
              </div> : null
          }
        </div>
        <div className="results-wrapper">
          <div className="column column-1of4">
            <Paper className={classes.paper}>
              <Typography type="subheading">TEAM RECORDS</Typography>
              <TeamRecords />
            </Paper>
          </div>
          {
            simDirty ?
              <div className="column column-3of4">
                <Paper className={classes.paper}>
                  <Typography type="subheading">SIMULATION RESULTS</Typography>
                  <ResultsLoader />
                </Paper>
              </div> : null
          }
          {
            !simDirty && type === 'Rank' ?
              <div className="column column-1of6">
                <Paper className={classes.paper}>
                  <Typography type="subheading" noWrap>CUSTOM COMBINATIONS</Typography>
                  <Combos />
                </Paper>
              </div> : null
          }
          {
            !simDirty && type === 'Record' ?
              <div className="column column-3of4">
                <Paper className={classes.paper}>
                  <ComboGraph />
                </Paper>
              </div> : null
          }
        </div>
      </div>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    results: state.results,
    type: state.type,
    simDirty: state.simDirty,
  };
};

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(Frame));

/**
 * PROP TYPES
 */
Frame.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  simDirty: PropTypes.bool.isRequired,
};
