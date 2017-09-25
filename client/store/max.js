const GET_MAX = 'GET_MAX';

const defaultMax = 250;

export const getMax = max => ({ type: GET_MAX, max });

export default function (state = defaultMax, action) {
  switch (action.type) {
    case GET_MAX:
      return action.max;
    default:
      return state;
  }
}
