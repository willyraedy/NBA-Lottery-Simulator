const GET_SLOPE = 'GET_SLOPE';

const defaultSlope = 0.4;

export const getSlope = slope => ({ type: GET_SLOPE, slope });

export default function (state = defaultSlope, action) {
  switch (action.type) {
    case GET_SLOPE:
      return action.slope;
    default:
      return state;
  }
}
