const GET_SIM_DIRTY = 'GET_SIM_DIRTY';

const defaultBool = false;

export const getSimDirty = bool => ({ type: GET_SIM_DIRTY, bool });

export default function (state = defaultBool, action) {
  switch (action.type) {
    case GET_SIM_DIRTY:
      return action.bool;
    default:
      return state;
  }
}
