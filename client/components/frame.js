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
      <div className="my-container">
        <div className="specs-wrapper">
          <div className="column specs-size-limiter">
            <Paper className={classes.paper}>
              <Typography type="subheading">CREATE YOUR OWN CUSTOM SPECS</Typography>
              <ModelSpecs />
            </Paper>
          </div>
          {/* {
            !simDirty ?
              <div className="column column-4of4">
                <Paper className={classes.paper}>
                  <Typography type="subheading">PRESET LEAGUE SYSTEMS</Typography>
                  <Presets />
                </Paper>
              </div> : null
          } */}
        </div>
        <div className="results-wrapper">
          <div className="column team-records">
            <Paper className={classes.paper}>
              <Typography type="subheading">TEAM RECORDS</Typography>
              <TeamRecords />
            </Paper>
          </div>
          {
            simDirty ?
              <div className="column sim-results">
                <Paper className={classes.paper}>
                  <Typography type="subheading">SIMULATION RESULTS</Typography>
                  <ResultsLoader />
                </Paper>
              </div> : null
          }
          {/* {
            !simDirty && type === 'Rank' ?
              <div className="column column-1of6">
                <Paper className={classes.paper}>
                  <Typography type="subheading" noWrap>COMBOS</Typography>
                  <Combos />
                </Paper>
              </div> : null
          } */}
          {
            !simDirty && type === 'Record' ?
              <div className="column combo-graph">
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
