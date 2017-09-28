import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow } from 'material-ui';

import createTeamRecordArr from './utils/createTeamRecordArr';
import { logitFunc, calculatePercentage, roundToOneDecimal } from './utils/logitFunc';

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

function TeamRecords({ classes, teamRecords, combos, totalCombos, type, max, slope, shift, totalGames }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Team Name</TableCell>
          <TableCell numeric>Record</TableCell>
          <TableCell numeric>1st Pick %</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {teamRecords.map((teamObj, i) => {
          return (
            <TableRow key={i}>
              <TableCell>{teamObj.teamName}</TableCell>
              <TableCell >{teamObj.record}</TableCell>
              {
                type === 'Rank' ? <TableCell >{Math.floor(1000 * (combos[i] / totalCombos)) / 10}</TableCell> : null
              }
              {
                type === 'Record' ? <TableCell >{roundToOneDecimal(calculatePercentage(logitFunc(max, slope, totalGames, teamObj.losses, shift), totalCombos))}</TableCell> : null
              }
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    teamRecords: createTeamRecordArr(state.teamRecords, state.numSeasons),
    combos: state.combos,
    totalCombos: state.combos.reduce((a, b) => a + b, 0),
    type: state.type,
    max: state.max,
    shift: state.shift,
    slope: state.slope,
    totalGames: (state.numSeasons + 1) * 82,
  };
};

const mapDispatch = null;

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withStyles(styles)(connect(mapState, mapDispatch)(TeamRecords));

/**
 * PROP TYPES
 */
TeamRecords.propTypes = {
  classes: PropTypes.object.isRequired,
  teamRecords: PropTypes.array.isRequired,
  combos: PropTypes.array.isRequired,
  totalCombos: PropTypes.number.isRequired,
};
