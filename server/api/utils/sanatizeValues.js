const convertQueryParamsToNumbers = (obj, keys) => {
  const clone = Object.assign({}, obj);
  keys.forEach((key) => {
    if (clone[key]) {
      if (typeof clone[key] === 'string') clone[key] = +clone[key];
      else if (Array.isArray(clone[key])) clone[key] = clone[key].map(el => +el);
      else throw new Error('Unexpected parameter data type'); // better error handling here
    }
  });
  return clone;
};

const sanatizeValues = (params) => {
  const convertedParams = convertQueryParamsToNumbers(params, ['numSims', 'combos', 'numPicks', 'shift', 'slope', 'numSeasons', 'season'])
  const specsAreClean = Object.keys(convertedParams).every((key) => {
    const value = convertedParams[key];
    switch (key) {
      case 'season':
        return value < 2018 && value > 1983 && Number.isInteger(value);
      case 'numSims':
        return value === 1000 || value === 10000 || value === 100000;
      case 'combos':
        return Array.isArray(value) && value.every(val => val >= 0 && val < 2000);
      case 'numPicks':
        return value < 11 && value > 0 && Number.isInteger(value);
      case 'type':
        return value === 'Rank' || value === 'Record';
      case 'shift':
        return value >= 5 && value <= 20;
      case 'slope':
        return value > 0 && value <= 0.5;
      case 'numSeasons':
        return value >= 0 && value < 3 && Number.isInteger(value);
      default:
        return false;
    }
  });
  if (specsAreClean) {
    const totalCombos = convertedParams.combos.reduce((acc, combo) => acc + combo, 0);
    if (totalCombos > 0) return convertedParams;
  }
  throw new Error('Invalid Specs');
};

module.exports = sanatizeValues;
