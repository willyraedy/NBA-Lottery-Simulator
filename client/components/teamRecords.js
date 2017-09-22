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

function TeamRecords({ classes, teamRecords }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Team Name</TableCell>
          <TableCell numeric>Record</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {teamRecords.map((teamObj, i) => {
          return (
            <TableRow key={i}>
              <TableCell>{teamObj.teamName}</TableCell>
              <TableCell >{teamObj.record}</TableCell>
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
};
