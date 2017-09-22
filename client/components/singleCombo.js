import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem, Input, Button, FormGroup } from 'material-ui';

import { changeCombo } from '../store';

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

function SingleCombo({ classes, comboIndex, currentCombo, handleComboChange, currentPercentage }) {
  return (
    <TableRow>
      <TableCell>
        <FormControl className={classes.formControl}>
          <Input
            type="number"
            defaultValue={currentCombo}
            onChange={e => handleComboChange(e.target.value, comboIndex)}
          />
        </FormControl>
      </TableCell>
      <TableCell>{Math.floor(currentPercentage * 10) / 10 }</TableCell>
    </TableRow>
  )
}


/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  const totalCombos = state.combos.reduce((a, b) => a + b, 0);
  const currentCombo = state.combos[ownProps.comboIndex];
  return {
    currentPercentage: (currentCombo / totalCombos) * 100,
    currentCombo,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleComboChange: (combo, index) => {
      dispatch(changeCombo(+combo, index));
    },
  };
};

export default withStyles(styles)(connect(mapState, mapDispatch)(SingleCombo));

/**
 * PROP TYPES
 */
SingleCombo.propTypes = {
  classes: PropTypes.object.isRequired,
  currentCombo: PropTypes.number.isRequired,
  currentPercentage: PropTypes.number.isRequired,
  comboIndex: PropTypes.number.isRequired,
  handleComboChange: PropTypes.func.isRequired,
};
