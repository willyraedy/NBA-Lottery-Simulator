import axios from 'axios';

const GET_COMBOS = 'GET_COMBOS';
const CHANGE_COMBO = 'CHANGE_COMBO';

const defaultCombos = [250, 199, 156, 119, 88, 63, 43, 28, 17, 11, 8, 7, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const getCombos = combos => ({ type: GET_COMBOS, combos });
export const changeCombo = (combo, index) => ({ type: CHANGE_COMBO, combo, index });

export default function (state = defaultCombos, action) {
  switch (action.type) {
    case GET_COMBOS:
      return action.combos;
    case CHANGE_COMBO:
      return state.map((combo, i) => {
        return i === action.index ? action.combo : combo;
      })
    default:
      return state;
  }
}
