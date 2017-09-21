// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, FormGroup, Button, Input } from 'material-ui';
import Paper from 'material-ui/Paper';

import SingleCombo from './singleCombo';

import generateArray from './utils/arrayCreator';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

function Combos({ classes }) {
  return (
    <FormGroup>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team Position in the Lottery</TableCell>
            <TableCell>Combinations</TableCell>
            <TableCell>Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            generateArray(0, 13).map((num) => {
              return (
                <SingleCombo
                  key={num}
                  classes={classes}
                  comboIndex={num}
                />
              )
            })
          }
          {/* <SingleSpec
            classes={classes}
            handleChange={handleNumSims}
            optionArr={[1, 1000, 10000, 100000, 1000000]}
            paramName="numSims"
            val={numSims}
            label="Number of Simulations:"
          /> */}
        </TableBody>
      </Table>
    </FormGroup>
  );
}

const mapState = (state) => {
  return {
    combos: state.combos,
  }
}

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(Combos));

Combos.propTypes = {
  classes: PropTypes.object.isRequired,
};
