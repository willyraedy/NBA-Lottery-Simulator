import axios from 'axios';
import { addError } from './error';
import {
  getNumberOfSimulations,
  getNumberOfLotteryPicks,
  getSeason,
  getShift,
  getSlope,
  getMax,
  getType,
} from './';

const GET_SAVED_MODEL_ID = 'GET_SAVED_MODEL_ID';

const defaultId = null;

export const getModelId = id => ({ type: GET_SAVED_MODEL_ID, id });

export const postSavedLotteryModelSpecs = paramObj => (dispatch) => {
  return axios.post('/api/save', paramObj)
    .then(res => res.data)
    .then((results) => {
      return dispatch(getModelId(results));
    })
    .catch(addError);
}

export const getSavedLotteryModelSpecs = modelId => (dispatch) => {
  return axios.get(`/api/save?id=${modelId}`)
    .then(res => res.data)
    .then((results) => {
      // update the entire store
      const { season, shift, slope, numSims, numPicks, max, id, type, combos } = results;
      dispatch(getModelId(id))
      dispatch(getNumberOfLotteryPicks(numPicks));
      dispatch(getNumberOfSimulations(numSims));
      dispatch(getSeason(season));
      if (shift) dispatch(getShift(shift));
      if (slope) dispatch(getSlope(slope));
      if (max) dispatch(getMax(max));
      if (id) dispatch(getType(type));
    })
    .catch(addError);
}

export default function (state = defaultId, action) {
  switch (action.type) {
    case GET_SAVED_MODEL_ID:
      return action.id;
    default:
      return state;
  }
}
