import axios from 'axios';

const GET_TYPE = 'GET_TYPE';

const defaultType = 'Rank';

export const getType = typeParam => ({ type: GET_TYPE, typeParam });

export default function (state = defaultType, action) {
  switch (action.type) {
    case GET_TYPE:
      return action.typeParam;
    default:
      return state;
  }
}
