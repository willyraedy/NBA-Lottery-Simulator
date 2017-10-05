import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow } from 'material-ui';

import SingleCombo from './singleCombo';
import createTeamRecordArr from './utils/createTeamRecordArr';
import { logitFunc, calculatePercentage, roundToOneDecimal } from './utils/logitFunc';

const assignCombosByRank = require('../../simulate/rankBasedCombos');
const addRank = require('../../simulate/addRank');

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
  padding: {
    padding: '0 1em 0 1em',
  },
  myContainer: {
    paddingRight: 40,
    paddingLeft: 40,
  },
});

function TeamRecords({ classes, teamRecords, combos, totalCombos, type, max, slope, shift, totalGames, totalRecordCombos }) {
  const formattedTeamRecords = assignCombosByRank(addRank(teamRecords), combos);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Team</TableCell>
          <TableCell numeric>Record</TableCell>
          <TableCell numeric>1st Pick %</TableCell>
          {
            type === 'Rank' ? <TableCell numeric>Combos</TableCell> : null
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {formattedTeamRecords.map((teamObj, i) => {
          return (
            <TableRow key={i}>
              <TableCell>{teamObj.teamName}</TableCell>
              <TableCell >{teamObj.record}</TableCell>
              {
                type === 'Rank' ? <TableCell >{Math.floor(1000 * (teamObj.combinations / totalCombos)) / 10}</TableCell> : null
              }
              {
                type === 'Rank' ?
                  <SingleCombo
                    classes={classes}
                    comboIndex={i}
                  /> : null
              }
              {
                type === 'Record' ? <TableCell >{roundToOneDecimal(calculatePercentage(logitFunc(max, slope, totalGames, teamObj.losses, shift), totalRecordCombos))}</TableCell> : null
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
  const totalGames = (state.numSeasons + 1) * 82;
  const teamRecords = createTeamRecordArr(state.teamRecords, state.numSeasons);
  return {
    teamRecords,
    combos: state.combos,
    totalCombos: state.combos.reduce((a, b) => a + b, 0),
    type: state.type,
    max: state.max,
    shift: state.shift,
    slope: state.slope,
    totalGames,
    totalRecordCombos: teamRecords.reduce((acc, teamObj) => acc + logitFunc(state.max, state.slope, totalGames, teamObj.losses, state.shift), 0),
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
