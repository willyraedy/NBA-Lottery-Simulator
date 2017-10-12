import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Paper, Typography, Button, AppBar, Toolbar } from 'material-ui';

import Navbar from './navbar';
import ModelSpecs from './modelSpecs';
import ResultsLoader from './resultsLoader';
import { RankGraph, RecordGraph } from './comboGraph';
import TeamRecords from './teamRecords';
import { removeError } from '../store';

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

const Frame = ({ classes, type, simDirty, error, handleError }) => {
  return (
    <div>
      <Navbar />
      {
        error ?
          <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.colorDefault} >
              <Toolbar>
                <Typography type="subheading" className={classes.errorMessage}>
                  {`Woops! Something went wrong: ${error.message}`}
                </Typography>
                <Button onClick={handleError} className={classes.errorButton} >Close</Button>
              </Toolbar>
            </AppBar>
          </div> : null
      }
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
        {
          simDirty ?
            <div className="column sim-results">
              <Paper className={classes.paper}>
                <Typography type="subheading">SIMULATION RESULTS</Typography>
                <ResultsLoader />
              </Paper>
            </div> : null
        }
        {
          !simDirty && type === 'Record' ?
            <div className="column combo-graph">
              <Paper className={classes.paper}>
                <RecordGraph />
              </Paper>
            </div> : null
        }
        {
          !simDirty && type === 'Rank' ?
            <div className="column combo-graph">
              <Paper className={classes.paper}>
                <RankGraph />
              </Paper>
            </div> : null
        }
      </div>
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
    error: state.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleError: () => dispatch(removeError()),
  };
};

export default withStyles(styles)(connect(mapState, mapDispatch)(Frame));

/**
 * PROP TYPES
 */
Frame.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object,
  type: PropTypes.string.isRequired,
  simDirty: PropTypes.bool.isRequired,
  handleError: PropTypes.func.isRequired,
};
