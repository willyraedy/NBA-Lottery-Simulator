import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Paper, Grid } from 'material-ui';

import Navbar from './navbar';
import ModelSpecs from './modelSpecs';
import Presets from './presets';
import ModelResults from './modelResults';
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
    overflowX: 'auto',
  },
  myContainer: {
    paddingRight: 40,
    paddingLeft: 40,
  },
});

const Frame = ({ classes, results, type }) => {
  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <div className="specs-wrapper">
          <div className="column column-4of4">
            <Paper className={classes.paper}>
              MODEL SPECS!!!!
              <ModelSpecs />
            </Paper>
          </div>
          <div className="column column-4of4">
            <Paper className={classes.paper}>
              PRESETS!!!!
              <Presets />
            </Paper>
          </div>
        </div>
        <div className="results-wrapper">
          <div className="column column-1of4">
            <Paper className={classes.paper}>
              RECORDS GO HERE
              <TeamRecords />
            </Paper>
          </div>
          {
            results.length ?
              <div className="column column-3of4">
                <Paper className={classes.paper}>
                  SIMULATION RESULTS
                  <ModelResults />
                </Paper>
              </div> : null
          }
          {
            !results.length && type === 'Rank' ?
              <div className="column column-1of4">
                <Paper className={classes.paper}>
                  COMBINATIONS
                  <Combos />
                </Paper>
              </div> : null
          }
          {
            !results.length && type === 'Record' ?
              <div className="column column-3of4">
                <Paper className={classes.paper}>
                  GRAPH GOES HERE
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
};
