import axios from 'axios';
import { addError } from './error';

const GET_SAVED_MODEL_ID = 'GET_SAVED_MODEL_ID';

const defaultId = null;

export const getModelId = id => ({ type: GET_SAVED_MODEL_ID, id });

export const fetchSavedLotteryModelSpecs = paramObj => (dispatch) => {
  return axios.post('/api/save', paramObj)
    .then(res => res.data)
    .then((results) => {
      dispatch(getModelId(results));
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
