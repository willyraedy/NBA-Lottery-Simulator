// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import generateArray from './utils/arrayCreator';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

function ModelResults({ classes, results }) {
  return (
    <Paper className={classes.paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team Name</TableCell>
            <TableCell numeric>Record</TableCell>
            <TableCell numeric>First Pick Percentage</TableCell>
            {
              generateArray(1, results.length).map(num => <TableCell key={num} numeric>{num}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            results.map((teamObj, i) => {
              return (
                <TableRow key={i}>
                  <TableCell >{teamObj.team}</TableCell>
                  <TableCell >{`${82 - teamObj.losses} - ${teamObj.losses}`}</TableCell>
                  <TableCell >{Math.floor(teamObj.firstPickPercentage * 100) / 100}</TableCell>
                  {
                    teamObj.percentages.map((pickPercentage, i) => {
                      return (
                        <TableCell key={i} numeric>{ Math.floor(pickPercentage * 100) / 100 }</TableCell>
                      )
                    })
                  }
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Paper>
  );
}

const mapState = (state) => {
  return {
    results: state.results,
  }
}

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(ModelResults));

ModelResults.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
};
