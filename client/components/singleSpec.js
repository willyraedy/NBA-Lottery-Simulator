import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { TableRow, TableCell, FormControl, Select, MenuItem, Input } from 'material-ui';

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

function SingleSpec({ classes, handleChange, optionArr, val, label, results }) {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell>
        <FormControl className={classes.formControl}>
          <Select
            disabled={!!results.length}
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
    results: state.results,
  }
};

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(SingleSpec));

/**
 * PROP TYPES
 */
SingleSpec.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  optionArr: PropTypes.array.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
};
