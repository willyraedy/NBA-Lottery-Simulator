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
    <Table>
      <TableHead>
        <TableRow>
          {
            generateArray(1, 14).map(num => <TableCell key={num} numeric>{num}</TableCell>)
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          results.map((teamObj, i) => {
            return (
              <TableRow key={i}>
                {
                  teamObj.percentages.map((pickPercentage, i) => {
                    return (
                      <TableCell key={i} numeric>{ Math.floor(pickPercentage * 100) / 100 }</TableCell>
                    )
                  }).slice(0, 14)
                }
              </TableRow>
            );
          }).slice(0, 14)}
      </TableBody>
    </Table>
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
