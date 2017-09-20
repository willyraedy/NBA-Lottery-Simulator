import axios from 'axios';

const GET_SEASON = 'GET_SEASON';

const defaultSeason = 2015;

export const getSeason = season => ({ type: GET_SEASON, season });

export default function (state = defaultSeason, action) {
  switch (action.type) {
    case GET_SEASON:
      return action.season;
    default:
      return state;
  }
}
