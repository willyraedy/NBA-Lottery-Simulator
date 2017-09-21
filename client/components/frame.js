import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import ModelSpecs from './modelSpecs';
import ModelResults from './modelResults';
import Combos from './combos';

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

function Frame({ classes, results }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={24} className={classes.myContainer}>
        <Grid item xs={12} sm={4} md={3}>
          <Paper className={classes.paper}>
            MODEL SPECS
            <ModelSpecs />
          </Paper>
        </Grid>
        {
          results.length ?
            <Grid item xs={12} sm={8} md={9}>
              <Paper className={classes.paper}>
                MODEL RESULTS
                <ModelResults />
              </Paper>
            </Grid> :
            <Grid item xs={12} sm={6} md={6}>
              <Paper className={classes.paper}>
                CUSTOMIZE THE LOTTERY COMBINATIONS FOR EACH TEAM
                <Combos />
              </Paper>
            </Grid>
        }
      </Grid>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    results: state.results,
  };
};

const mapDispatch = null;

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withStyles(styles)(connect(mapState, mapDispatch)(Frame));

/**
 * PROP TYPES
 */
Frame.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
};
