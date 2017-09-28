import axios from 'axios';

const GET_NUMBER_OF_SEASONS = 'GET_NUMBER_OF_SEASONS';

const defaultNumSeasons = 0;

export const getNumberOfSeasons = num => ({ type: GET_NUMBER_OF_SEASONS, num });

export default function (state = defaultNumSeasons, action) {
  switch (action.type) {
    case GET_NUMBER_OF_SEASONS:
      return action.num;
    default:
      return state;
  }
}
