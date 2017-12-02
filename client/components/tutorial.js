import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Typography, Button } from 'material-ui';
import history from '../history';

function Tutorial() {
  return (
    <div className="tutorial-container">
      <Typography type="headline">
        HOW TO MAKE YOUR OWN LOTTERY MODEL
      </Typography>
      <Typography type="body1">
        To make a model choose your specs on the left. The first choice is to choose whether the model should be based on the rank of the teams or their wins-loss record. Next, pick a season you’d like to simulate.
      </Typography>
      <Typography type="body1">
        If you choose ‘Rank’, a list of the combinations assigned to each team appears in the ‘Team Records’ table. Adjust these to create whatever model you like. You can also click the ‘Preset’ buttons to use the combinations of the newly approved system or the old system it replaces.
      </Typography>
      <Typography type="body1">
        With ‘Record’ based systems, a team’s wins determine their combinations according to a mathematical function (a modified logit function for you math nerds). To modify this mathematical function, you change the ‘slope’ and ‘shift’ parameters.
      </Typography>
      <Typography type="body1">
        If you look at the shape of the curve, there’s a high end on the left and a low end on the right. The ‘slope’ determines how quickly the curve transitions from high to low. The higher the slope, the steeper the transition.
      </Typography>
      <Typography type="body1">
        ‘Shift’ moves the graph laterally. As the ‘shift’ goes up, the graph moves right. This means more teams get the highest odds. As the ‘shift’ goes down, the graph moves left and fewer teams reach the flat part of the curve.
      </Typography>
      <Typography type="body1">
        Note that changing the ‘slope’ significantly changes the function and typically requires modifying the ‘shift’ in response.
      </Typography>
      <Typography type="body1">
        In either model, you can choose how many picks will be selected with the lottery using the ‘Lottery Pick’ spec. For example, if you choose 5, then 5 picks will be selected with the lottery and the worst team could drop all the way to the sixth pick.
      </Typography>
      <Typography type="body1">
        The ‘Previous Seasons’ spec allows you to factor in a team’s records over multiple seasons when assigning combinations. If ‘Previous Seasons’ is set to 0 then the lottery will be determined by a single season. If ‘Previous Seasons’ is set to 2 then teams will be ranked by their records over the past three seasons (the current season plus the two previous). Note that if you’re simulating older seasons, a team has to have existed in all three seasons for it to be included in the simulation.
      </Typography>
      <Typography type="body1">
        You can see every team’s record and their chance at the first pick in the ‘Team Records’ table. This allows you to get a sense of your system before you simulate it.
      </Typography>
      <Typography type="body1">
        When you’re ready, hit the ‘Simulate Your Model’ button. The program will simulate the draft the number of times you choose in the ‘Simulations’ spec and approximate the chance that each team gets each pick. The more simulations you choose, the more accurate the results but the longer it takes to run.
      </Typography>
      <Button color="primary" className="tutorial-button" onClick={() => history.push('/')}>
        LET'S GET STARTED
      </Button>
    </div>
  )
}

export default Tutorial;

