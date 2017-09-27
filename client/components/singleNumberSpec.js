import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { TableRow, TableCell, FormControl, Input } from 'material-ui';

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

function SingleNumberSpec({ classes, handleChange, val, label, results }) {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell>
        <FormControl className={classes.formControl}>
          <Input
            disabled={!!results.length}
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
const mapState = (state) => {
  return {
    results: state.results,
  }
};

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(SingleNumberSpec));

/**
 * PROP TYPES
 */
SingleNumberSpec.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  val: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};
