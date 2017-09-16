import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem, Input } from 'material-ui';

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

function ModelSpecs(props) {
  const classes = props.classes;

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Type:</TableCell>
          <TableCell>
            <FormControl className={classes.formControl}>
              <Select
                value="Rank"
                input={<Input id="age-simple" />}
              >
                <MenuItem value="Rank">Rank</MenuItem>
                <MenuItem value="Record">Record</MenuItem>
              </Select>
            </FormControl>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Type:</TableCell>
          <TableCell>Type:</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Type:</TableCell>
          <TableCell>Type:</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Type:</TableCell>
          <TableCell>Type:</TableCell>
        </TableRow>
      </TableBody>
    </Table>

  );
}

/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = null;

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withStyles(styles)(connect(mapState, mapDispatch)(ModelSpecs));

/**
 * PROP TYPES
 */
ModelSpecs.propTypes = {
  classes: PropTypes.object.isRequired,
};
