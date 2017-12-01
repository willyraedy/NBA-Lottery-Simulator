// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      width: window.innerWidth,
    }
  }

  setResponsiveWidth = () => {
    this.setState({ width: window.innerWidth });
  }

  responsiveNavbarName = (width) => {
    if (width < 370) {
      return 'SIMULATOR'
    } else if (width < 565) {
      return 'LOTTERY SIM';
    }
    return 'NBA LOTTERY SIMULATOR';
  }

  componentDidMount() {
    window.addEventListener('resize', this.setResponsiveWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setResponsiveWidth)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              {this.responsiveNavbarName(this.state.width)}
            </Typography>
            <Button color="contrast" href="/">START OVER</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

// /**
//  * CONTAINER
//  */
const mapState = null;

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar));

// /**
//  * PROP TYPES
//  */
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};
