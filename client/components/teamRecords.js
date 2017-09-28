import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow } from 'material-ui';

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

function TeamRecords({ classes, teamRecords, combos, totalCombos, type, max, slope, shift }) {
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
                type === 'Record' ? <TableCell >{Math.floor(1000 * (max * (1 / (1 + Math.exp((slope * (82 - teamObj.losses)) - shift))) / totalCombos)) / 10}</TableCell> : null
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
  const teamRecordArr = [];
  Object.keys(state.teamRecords).forEach((teamName, i) => {
    const losses = state.teamRecords[teamName];
    if (i) {
      teamRecordArr.push({
        teamName,
        record: `${82 - losses} - ${losses}`,
        // what year did they start playing 82 games???????
        losses,
      });
    }
  });
  return {
    teamRecords: teamRecordArr.sort((team1, team2) => team2.losses - team1.losses).slice(0, 14),
    combos: state.combos,
    totalCombos: state.combos.reduce((a, b) => a + b, 0),
    type: state.type,
    max: state.max,
    shift: state.shift,
    slope: state.slope,
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
