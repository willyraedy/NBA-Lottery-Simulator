import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableRow, TableCell, FormControl, Input } from 'material-ui';

function SingleNumberSpec({ handleChange, val, label, areResults, step, min, max }) {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell>
        <FormControl>
          <Input
            disabled={areResults}
            inputProps={{ step, min, max }}
            type="number"
            value={val}
            onChange={handleChange}
          />
        </FormControl>
      </TableCell>
    </TableRow>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    areResults: !!state.results.length,
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(SingleNumberSpec);

/**
 * PROP TYPES
 */
SingleNumberSpec.propTypes = {
  areResults: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  val: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
};
