import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Card, Grid, CardContent } from 'material-ui';

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
  },
  myContainer: {
    paddingRight: 40,
    paddingLeft: 40,
  },
});

class Frame extends React.Component {

  componentDidMount() {
    console.log('Frame Props', this.props)
  }

  render() {
    const { classes, results, type } = this.props;
    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <Grid container spacing={24} className={classes.myContainer}>
            <Grid item xs={12} sm={4} md={3}>
              <Card className={classes.paper}>
                <CardContent>
                  MODEL SPECS!!!!
                  <ModelSpecs />
                </CardContent>
              </Card>
            </Grid>
            {
              results.length ?
                <Grid item xs={12} sm={8} md={9}>
                  <Card className={classes.paper}>
                    MODEL RESULTS
                    <ModelResults />
                  </Card>
                </Grid> :
                <Grid item xs={4} sm={3} md={3}>
                  <Card className={classes.paper}>
                    <CardContent>
                      RECORDS GO HERE
                      <TeamRecords />
                    </CardContent>
                  </Card>
                </Grid>
            }
            {
              !results.length && type === 'Rank' ?
                <Grid item xs={8} sm={5} md={6}>
                  <Card className={classes.paper}>
                    <CardContent>
                      CUSTOMIZE THE LOTTERY COMBINATIONS FOR EACH TEAM
                      <Combos />
                    </CardContent>
                  </Card>
                </Grid> : null
            }
            {
              !results.length && type === 'Record' ?
                <Grid item xs={8} sm={5} md={6}>
                  <Card className={classes.paper}>
                    GRAPH GOES HERE
                    <ComboGraph />
                  </Card>
                </Grid> : null
            }
          </Grid>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
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
