import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { TableRow, TableCell, FormControl, Input } from 'material-ui';

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

function SingleCombo({ classes, comboIndex, currentCombo, handleComboChange }) {
  return (
    <TableRow>
      <TableCell>
        <FormControl className={classes.formControl}>
          <Input
            type="number"
            value={currentCombo}
            onChange={e => handleComboChange(e.target.value, comboIndex)}
          />
        </FormControl>
      </TableCell>
    </TableRow>
  )
}


/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  const currentCombo = state.combos[ownProps.comboIndex];
  return {
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
  comboIndex: PropTypes.number.isRequired,
  handleComboChange: PropTypes.func.isRequired,
};
