import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableRow, TableCell, FormControl, Select, MenuItem, Input } from 'material-ui';

function SingleSpec({ handleChange, optionArr, val, label, areResults }) {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell>
        <FormControl>
          <Select
            disabled={areResults}
            value={val}
            input={<Input onChange={handleChange} id={label} />}
          >
            {
              optionArr.map((option, i) => {
                if (option === 'custom') {
                  return (<MenuItem key={i} value={option}>{option}</MenuItem>)
                }
                return (<MenuItem key={i} value={option}>{option}</MenuItem>)
              })
            }
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  )
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

export default connect(mapState, mapDispatch)(SingleSpec);

/**
 * PROP TYPES
 */
SingleSpec.propTypes = {
  areResults: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  optionArr: PropTypes.array.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
};
