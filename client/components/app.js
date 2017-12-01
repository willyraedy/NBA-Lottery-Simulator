import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Paper, Typography } from 'material-ui';

import ModelSpecs from './modelSpecs';
import ResultsLoader from './resultsLoader';
import { RankGraph, RecordGraph } from './comboGraph';
import TeamRecords from './teamRecords';

const styles = theme => ({
  // errorBar: {
  //   display: 'flex',
  //   backgroundColor: 'red',
  //   textAlign: 'center',
  //   justifyContent: 'space-between',
  // },
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
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  colorDefault: {
    backgroundColor: 'orange',
  },
  errorMessage: {
    color: 'white',
    flex: 1,
  },
  errorButton: {
    color: 'white',
  },
});

const App = ({ classes, type, simDirty }) => {
  return (
    <div className="my-container">
      <div className="specs-wrapper">
        <div className="column specs-size-limiter">
          <Paper className={classes.paper}>
            <Typography type="subheading">CUSTOM SPECS</Typography>
            <ModelSpecs />
          </Paper>
        </div>
      </div>
      <div className="column team-records">
        <Paper className={classes.paper}>
          <Typography type="subheading">TEAM RECORDS</Typography>
          <TeamRecords />
        </Paper>
      </div>
      {simDirty ? (
        <div className="column sim-results">
          <Paper className={classes.paper}>
            <Typography type="subheading">SIMULATION RESULTS</Typography>
            <ResultsLoader />
          </Paper>
        </div>
      ) : null}
      {!simDirty && type === 'Record' ? (
        <div className="column combo-graph">
          <Paper className={classes.paper}>
            <RecordGraph />
          </Paper>
        </div>
      ) : null}
      {!simDirty && type === 'Rank' ? (
        <div className="column combo-graph">
          <Paper className={classes.paper}>
            <RankGraph />
          </Paper>
        </div>
      ) : null}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    type: state.type,
    simDirty: state.simDirty,
  };
};

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(App));

/**
 * PROP TYPES
 */
App.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object,
  type: PropTypes.string.isRequired,
  simDirty: PropTypes.bool.isRequired,
  handleError: PropTypes.func.isRequired,
};

