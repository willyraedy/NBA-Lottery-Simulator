const GET_SHIFT = 'GET_SHIFT';

const defaultShift = 10;

export const getShift = shift => ({ type: GET_SHIFT, shift });

export default function (state = defaultShift, action) {
  switch (action.type) {
    case GET_SHIFT:
      return action.shift;
    default:
      return state;
  }
}
