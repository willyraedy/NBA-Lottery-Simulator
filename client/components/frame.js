import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import ModelSpecs from './modelSpecs';

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

function Frame(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} className={classes.myContainer}>
        <Grid item xs={12} sm={4} md={3}>
          <Paper className={classes.paper}>
            MODEL SPECS
            <ModelSpecs />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Paper className={classes.paper}>MODEL RESULTS</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = null;

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withStyles(styles)(connect(mapState, mapDispatch)(Frame));

/**
 * PROP TYPES
 */
Frame.propTypes = {
  classes: PropTypes.object.isRequired,
};
