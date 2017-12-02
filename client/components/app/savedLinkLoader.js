// @flow weak
/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { Typography } from 'material-ui';


const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const SavedLinkLoader = ({ savedModelId, classes }) => {
  return (
    savedModelId ?
      <Typography type="body1">{`Link to share: ${window.location.origin}/savedModel/${savedModelId}`}</Typography> :
      <div className={classes.progressContainer}>
        <CircularProgress className={classes.progress} />
      </div>
  );
}

// /**
//  * CONTAINER
//  */
const mapState = (state) => {
  return {
    savedModelId: state.savedModelId,
  };
};

const mapDispatch = null;

export default withStyles(styles)(connect(mapState, mapDispatch)(SavedLinkLoader));

// /**
//  * PROP TYPES
//  */
SavedLinkLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  savedModelId: PropTypes.number,
};
