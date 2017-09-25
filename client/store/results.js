import axios from 'axios';
import { addError } from './error';

const GET_SIMULATION_RESULTS = 'GET_SIMULATION_RESULTS';

const defaultResults = [];

const getSimulationResults = results => ({ type: GET_SIMULATION_RESULTS, results });

export const fetchSimulationResults = paramObj => (dispatch) => {
  const { type, season, numPicks, numSims, combos } = paramObj;
  const comboQueryString = createComboQueryString(combos);
  return axios.get(`/api/simulate?type=${type}&season=${season}&numPicks=${numPicks}&numSims=${numSims}&${comboQueryString}`)
    .then(res => res.data)
    .then((results) => {
      dispatch(getSimulationResults(results));
    })
    .catch(addError);
}

export default function (state = defaultResults, action) {
  switch (action.type) {
    case GET_SIMULATION_RESULTS:
      return action.results;
    default:
      return state;
  }
}

// Helper Function

const createComboQueryString = comboArr => comboArr.map((combo, i) => `combos[]=${combo}`).join('&');