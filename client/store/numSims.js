import axios from 'axios';

const GET_NUMBER_OF_SIMULATIONS = 'GET_NUMBER_OF_SIMULATIONS';

const defaultNumberOfSimulations = 10000;

export const getNumberOfSimulations = typeParam => ({ type: GET_NUMBER_OF_SIMULATIONS, typeParam });

export default function (state = defaultNumberOfSimulations, action) {
  switch (action.type) {
    case GET_NUMBER_OF_SIMULATIONS:
      return action.typeParam;
    default:
      return state;
  }
}
