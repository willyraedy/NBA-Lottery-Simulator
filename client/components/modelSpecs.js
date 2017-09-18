import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Table, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem, Input, Button, FormGroup } from 'material-ui';
import { fetchSimulationResults } from '../store';
import SingleSpec from './singleSpec';

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

function generateArray(start, end) {
  const seasonsArray = [];
  for (let i = start; i <= end; i++) {
    seasonsArray.push(i);
  }
  return seasonsArray;
}

class ModelSpecs extends React.Component {
  constructor() {
    super();
    this.state = {
      type: 'Rank',
      season: 2015,
      numPicks: 3,
      numTeams: 14,
      numSims: 10000,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const value = e.target.value;
    console.log('key', key, 'Value: ', value)
    this.setState({ [key]: value });
  }

  render() {
    const classes = this.props.classes;
    return (
      <FormGroup>
        <Table>
          <TableBody>
            <SingleSpec
              classes={classes}
              handleChange={this.handleChange}
              optionArr={['Rank', 'Record']}
              paramName="type"
              val={this.state.type}
              label="Type:"
            />
            <SingleSpec
              classes={classes}
              handleChange={this.handleChange}
              optionArr={generateArray(1968, 2015)}
              paramName="season"
              val={this.state.season}
              label="Season:"
            />
            <SingleSpec
              classes={classes}
              handleChange={this.handleChange}
              optionArr={generateArray(1, 5)}
              paramName="numPicks"
              val={this.state.numPicks}
              label="Number of Lottery Picks:"
            />
            <SingleSpec
              classes={classes}
              handleChange={this.handleChange}
              optionArr={generateArray(1, 30)}
              paramName="numTeams"
              val={this.state.numTeams}
              label="Number of Lottery Teams:"
            />
            <SingleSpec
              classes={classes}
              handleChange={this.handleChange}
              optionArr={[1000, 10000, 100000, 1000000]}
              paramName="numSims"
              val={this.state.numSims}
              label="Number of Simulations:"
            />
          </TableBody>
        </Table>
        <Button color="primary" className={classes.button} onClick={() => this.props.simulateModel(this.state)}>
          Simulate
        </Button>
      </FormGroup>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = (dispatch) => {
  return {
    simulateModel: (params) => {
      dispatch(fetchSimulationResults(params))
    }
  }
};

export default withStyles(styles)(connect(mapState, mapDispatch)(ModelSpecs));

/**
 * PROP TYPES
 */
ModelSpecs.propTypes = {
  classes: PropTypes.object.isRequired,
  simulateModel: PropTypes.func.isRequired,
};
