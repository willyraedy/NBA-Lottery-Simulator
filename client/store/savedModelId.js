import axios from 'axios';
import { addError } from './error';
import {
  getNumberOfSimulations,
  getNumberOfLotteryPicks,
  getSeason,
  getShift,
  getSlope,
  getType,
  getNumberOfSeasons,
  getSavedDirty,
} from './';

const GET_SAVED_MODEL_ID = 'GET_SAVED_MODEL_ID';

const defaultId = null;

export const getModelId = id => ({ type: GET_SAVED_MODEL_ID, id });

export const postSavedLotteryModelSpecs = paramObj => (dispatch) => {
  return axios.post('/api/save', paramObj)
    .then(res => res.data)
    .then((modelId) => {
      dispatch(getModelId(modelId));
      dispatch(getSavedDirty(true));
      return modelId;
    })
    .catch((err) => {
      dispatch(addError(err));
    });
};

export const getSavedLotteryModelSpecs = modelId => (dispatch) => {
  return axios.get(`/api/save?id=${modelId}`)
    .then(res => res.data)
    .then((results) => {
      // update the entire store
      const { season, shift, slope, numSims, numPicks, id, type, combos, numSeasons } = results;
      dispatch(getModelId(id));
      dispatch(getNumberOfSeasons(numSeasons));
      dispatch(getNumberOfLotteryPicks(numPicks));
      dispatch(getNumberOfSimulations(numSims));
      dispatch(getSeason(season));
      if (shift) dispatch(getShift(shift));
      if (slope) dispatch(getSlope(slope));
      if (id) dispatch(getType(type));
      // return results so component can immediately simulate saved model
      return results;
    })
    .catch((err) => {
      dispatch(addError(err));
    });
};

export default function (state = defaultId, action) {
  switch (action.type) {
    case GET_SAVED_MODEL_ID:
      return action.id;
    default:
      return state;
  }
}
