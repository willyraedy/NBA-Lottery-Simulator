const GET_SAVED_DIRTY = 'GET_SAVED_DIRTY';

const defaultBool = false;

export const getSavedDirty = bool => ({ type: GET_SAVED_DIRTY, bool });

export default function (state = defaultBool, action) {
  switch (action.type) {
    case GET_SAVED_DIRTY:
      return action.bool;
    default:
      return state;
  }
}
