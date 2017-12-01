import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableCell, FormControl, Input } from 'material-ui';

import { changeCombo } from '../../store';

function SingleCombo({ comboIndex, currentCombo, handleComboChange }) {
  return (
    <TableCell>
      <FormControl>
        <Input
          type="number"
          value={currentCombo}
          onChange={e => handleComboChange(e.target.value, comboIndex)}
        />
      </FormControl>
    </TableCell>
  );
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

export default connect(mapState, mapDispatch)(SingleCombo);

/**
 * PROP TYPES
 */
SingleCombo.propTypes = {
  currentCombo: PropTypes.number.isRequired,
  comboIndex: PropTypes.number.isRequired,
  handleComboChange: PropTypes.func.isRequired,
};
