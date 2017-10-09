const adjustCombos = (action, combos, getCombos, dispatch) => {
  // calculate length of combos array
  const newComboLength = Object.keys(action.teamLossesObj).filter((teamName) => {
    return action.teamLossesObj[teamName] && action.teamLossesObj[teamName] < 1000;
  }).length - 16;
  // adjust comobs length to reflect number of playoff teams
  if (combos.length >= newComboLength) {
    return dispatch(getCombos(combos.slice(0, newComboLength)));
  }
  const extendedCombos = combos.concat(Array(newComboLength - combos.length).fill(0));
  return dispatch(getCombos(extendedCombos));
};

export default adjustCombos;
