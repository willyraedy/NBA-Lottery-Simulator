const siege = require('siege');

siege()
  .on(8080)
  .for(200).times
  .concurrent(10)
  .get('/api/simulate?type=Rank&season=2017&numPicks=4&numSims=10000&numSeasons=0&combos[]=140&combos[]=140&combos[]=140&combos[]=125&combos[]=105&combos[]=90&combos[]=75&combos[]=60&combos[]=45&combos[]=30&combos[]=20&combos[]=15&combos[]=10&combos[]=5')
  .attack()
