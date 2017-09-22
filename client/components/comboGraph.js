// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import generateArray from './utils/arrayCreator';

const styles = theme => ({
  graphBox: {
    width: '500px',
    height: '500px',
  },
});

class ComboGraph extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const brd = JXG.JSXGraph.initBoard('jxgbox', { axis: true, boundingbox: [0, 300, 72, 0] });
    // brd.suspendUpdate();
    // const a = brd.create('slider', [[50,290], [60,290], [0,0.4,1]], {name:'a'});
    // const b = brd.create('slider', [[50,275], [60,275], [0,20,40]], {name:'b'});
    // const A = brd.create('slider', [[50,260], [60,260], [100,250,250]], {name:'A'});

    // const c = brd.create('functiongraph', [function (x) { return A.value() * (1 / (1 + Math.exp(-((a.value() * x) - b.value())))); }], { strokeColor: '#aa2233', strokeWidth: 3 });
    // const c = brd.create('functiongraph', [function (x) { return 250 * (1 / (1 + Math.exp(x))); }], { strokeColor: '#aa2233', strokeWidth: 3 });
    // brd.unsuspendUpdate();

    brd.suspendUpdate();
    var slope = brd.create('slider',[[50,290],[60,290],[0,0.4,1]],{name:'slope'});
    var shift = brd.create('slider',[[50,270],[60,270],[0,20,40]],{name:'shift'});

    var c = brd.create('curve',[
              function(t){return t;},
              function(t){return 250 * (1 / (1+ Math.exp((slope.Value() * t) - shift.Value())));},
              ],{strokeColor:'#aa2233',strokeWidth:3});
    brd.unsuspendUpdate();
  }

  render() {
    return (
      <div id="jxgbox" className="jxgbox" style={{ width: '700px', height: '500px' }} />
    );
  }
}

const mapState = (state) => {
  return {
    combos: state.combos,
  }
}

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(ComboGraph));

ComboGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};
