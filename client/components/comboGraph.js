// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import createTeamRecordArr from './utils/createTeamRecordArr';
import createDataPoints from './utils/createDataPoints';

const styles = theme => ({
  graphBox: {
    width: '500px',
    height: '500px',
  },
});

class ComboGraph extends React.Component {

  componentDidMount() {
    Highcharts.chart('container', this.props.options);
  }

  componentDidUpdate() {
    Highcharts.chart('container', this.props.options);
  }

  render() {
    return (
      <div id="container" style={{ width: '100%', height: '700px' }} />
    );
  }
}

const mapState = (state) => {
  const totalGames = 83 * (state.numSeasons + 1);
  const dataPoints = createDataPoints(createTeamRecordArr(state.teamRecords, state.numSeasons), state.max, state.slope, state.shift, totalGames);
  return {
    options: {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Lottery Pick Distribution'
      },
      subtitle: {
        text: 'Smooth'
      },
      xAxis: {
        title: {
          text: 'Wins'
        },
        minPadding: 0.05,
        maxPadding: 0.05,
      },
      yAxis: {
        title: {
          text: 'Lottery Combinations'
        }
      },
      plotOptions: {
        spline: {
          enableMouseTracking: true,
        }
      },
      tooltip: {
        headerFormat: '<b>{point.name}</b><br/>',
        pointFormat: '{point.name}: {point.x} wins, {point.y} combos'
      },
      series: [{
        name: 'Custom Model',
        marker: {
          symbol: 'square',
          enabled: true,
        },
        data: dataPoints,
      }]
    },
  };
};

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(ComboGraph));

ComboGraph.propTypes = {
  options: PropTypes.object.isRequired,
};
