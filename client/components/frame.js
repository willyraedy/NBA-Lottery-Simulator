import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Paper, Grid } from 'material-ui';

import Navbar from './navbar';
import ModelSpecs from './modelSpecs';
import ModelResults from './modelResults';
import ComboGraph from './comboGraph';
import Combos from './combos';
import TeamRecords from './teamRecords';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    overflowX: 'auto',
  },
  myContainer: {
    paddingRight: 40,
    paddingLeft: 40,
  },
  modelSpecs: {
    justify: 'center',
  }
});

const Frame = ({ classes, results, type }) => {
  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <Grid container spacing={40} className={classes.myContainer}>
          <Grid item xs={12} sm={6} md={3} >
            <Paper className={classes.paper}>
              MODEL SPECS!!!!
              <ModelSpecs />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              RECORDS GO HERE
              <TeamRecords />
            </Paper>
          </Grid>
          {
            results.length ?
              <Grid item xs={12} sm={6} md={6}>
                <Paper className={classes.paper}>
                  SIMULATION RESULTS
                  <ModelResults />
                </Paper>
              </Grid> : null
          }
          {
            !results.length && type === 'Rank' ?
              <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.paper}>
                  CUSTOMIZE THE LOTTERY COMBINATIONS FOR EACH TEAM
                  <Combos />
                </Paper>
              </Grid> : null
          }
          {
            !results.length && type === 'Record' ?
              <Grid item xs={12} sm={6} md={6}>
                <Paper className={classes.paper}>
                  GRAPH GOES HERE
                  <ComboGraph />
                </Paper>
              </Grid> : null
          }
        </Grid>
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
