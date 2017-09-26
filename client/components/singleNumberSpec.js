import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem, Input, Button, FormGroup } from 'material-ui';

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

function SingleNumberSpec({ classes, handleChange, optionArr, val, label }) {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell>
        <FormControl className={classes.formControl}>
          <Input
            type="number"
            defaultValue={val}
            onChange={handleChange}
          />
        </FormControl>
      </TableCell>
    </TableRow>
  )
}


/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(SingleNumberSpec));

/**
 * PROP TYPES
 */
SingleNumberSpec.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  optionArr: PropTypes.array.isRequired,
  paramName: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
};
