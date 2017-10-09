/* global window Highcharts */
// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import createTeamRecordArr from './utils/createTeamRecordArr';
import { recordDataPoints, rankDataPoints } from './utils/createDataPoints';

const styles = theme => ({
  graphBox: {
    width: '500px',
    height: '500px',
  },
});

const setChartWidth = (currWidth) => {
  if (currWidth < 1001) return 0.8 * currWidth;
  return 0.36 * currWidth;
};

class ComboGraph extends React.Component {

  resizeChart = () => {
    this.props.options.chart.width = setChartWidth(window.innerWidth);
    Highcharts.chart('container', this.props.options);
  }

  componentDidMount() {
    this.props.options.chart.width = setChartWidth(window.innerWidth);
    Highcharts.chart('container', this.props.options);

    window.addEventListener('resize', this.resizeChart);
  }

  componentDidUpdate() {
    this.props.options.chart.width = setChartWidth(window.innerWidth);
    Highcharts.chart('container', this.props.options);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChart)
  }

  render() {
    return (
      <div id="container" style={{ width: '100%' }}>
        Chart goes here
      </div>
    );
  }
}

const mapStateForRecord = (state) => {
  const totalGames = 82 * (state.numSeasons + 1);
  const dataPointsRaw = recordDataPoints(createTeamRecordArr(state.teamRecords, state.numSeasons), state.max, state.slope, state.shift, totalGames);

  return {
    options: {
      chart: {
        type: 'spline',
        style: {
          fontFamily: '"Toppan Bunkyu Midashi Gothic", "Roboto", "Helvetica", "Arial", sans-serif',
        }
      },
      title: {
        text: 'LOTTERY PICK DISTRIBUTION'
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
      legend: {
        enabled: false,
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
        name: false,
        marker: {
          symbol: 'square',
          enabled: true,
        },
        data: dataPointsRaw.map((dataObj) => {
          dataObj.y = Math.round(dataObj.y);
          return dataObj;
        }),
      }],
    }
  };
};

const mapStateForRank = (state) => {
  const dataPoints = rankDataPoints(createTeamRecordArr(state.teamRecords, state.numSeasons), state.combos);

  return {
    options: {
      chart: {
        type: 'spline',
        style: {
          fontFamily: '"Toppan Bunkyu Midashi Gothic", "Roboto", "Helvetica", "Arial", sans-serif',
        }
      },
      title: {
        text: 'LOTTERY PICK DISTRIBUTION'
      },
      xAxis: {
        title: {
          text: 'Rank'
        },
        minPadding: 0.05,
        maxPadding: 0.05,
        tickAmount: state.combos.length,
        tickInterval: 1,
      },
      yAxis: {
        title: {
          text: 'Lottery Combinations'
        }
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        spline: {
          enableMouseTracking: true,
        }
      },
      tooltip: {
        headerFormat: '<b>{point.name}</b><br/>',
        pointFormat: 'Rank {point.x}: {point.name} - {point.y} combos'
      },
      series: [{
        name: false,
        marker: {
          symbol: 'square',
          enabled: true,
        },
        data: dataPoints,
      }],
    },
  };
};

const mapDispatch = null;

export const RecordGraph = withStyles(styles)(connect(mapStateForRecord, mapDispatch)(ComboGraph));
export const RankGraph = withStyles(styles)(connect(mapStateForRank, mapDispatch)(ComboGraph));

ComboGraph.propTypes = {
  options: PropTypes.object.isRequired,
};
