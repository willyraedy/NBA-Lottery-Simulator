import axios from 'axios';
import { addError } from './error';
import { getSimDirty } from './simDirty';

const GET_SIMULATION_RESULTS = 'GET_SIMULATION_RESULTS';

const defaultResults = [];

export const getSimulationResults = results => ({ type: GET_SIMULATION_RESULTS, results });

export const fetchSimulationResults = paramObj => (dispatch) => {
  const { type, season, numPicks, numSims, combos, shift, slope, numSeasons } = paramObj;
  let pathString = '';

  if (type === 'Rank') pathString = `/api/simulate?type=${type}&season=${season}&numPicks=${numPicks}&numSims=${numSims}&numSeasons=${numSeasons}&${createComboQueryString(combos)}`;
  else if (type === 'Record') pathString = `/api/simulate?type=${type}&season=${season}&numPicks=${numPicks}&numSims=${numSims}&numSeasons=${numSeasons}&shift=${shift}&slope=${slope}`;
  else throw new Error('Wrong kind of model type') // todo

  return axios.get(pathString)
    .then(res => res.data)
    .then((results) => {
      dispatch(getSimulationResults(results));
    })
    .catch((err) => {
      dispatch(addError(err));
      dispatch(getSimDirty(false));
    });
};

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
