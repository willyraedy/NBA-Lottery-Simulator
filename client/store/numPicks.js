import axios from 'axios';

const GET_NUMBER_OF_LOTTERY_PICKS = 'GET_NUMBER_OF_LOTTERY_PICKS';

const defaultNumLotteryPicks = 4;

export const getNumberOfLotteryPicks = numPicks => ({ type: GET_NUMBER_OF_LOTTERY_PICKS, numPicks });

export default function (state = defaultNumLotteryPicks, action) {
  switch (action.type) {
    case GET_NUMBER_OF_LOTTERY_PICKS:
      return action.numPicks;
    default:
      return state;
  }
}
