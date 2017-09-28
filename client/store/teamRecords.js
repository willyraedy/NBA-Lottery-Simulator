import axios from 'axios';
import { addError } from './error';

const GET_TEAM_RECORDS = 'GET_TEAM_RECORDS';

const defaultTeamRecords = {
  "season": 2015,
  "atlanta": 22,
  "boston": 42,
  "brooklyn": 44,
  "charlotte": 49,
  "chicago": 32,
  "cleveland": 29,
  "dallas": 32,
  "denver": 52,
  "detroit": 50,
  "gsw": 15,
  "houston": 26,
  "indiana": 44,
  "lac": 26,
  "lal": 61,
  "memphis": 27,
  "miami": 45,
  "milwaukee": 41,
  "minnesota": 66,
  "neworleans": 37,
  "newyork": 65,
  "oklahoma": 37,
  "orlando": 57,
  "philadelphia": 64,
  "phoenix": 43,
  "portland": 31,
  "sacramento": 53,
  "sanantonio": 27,
  "toronto": 33,
  "utah": 44,
  "washington": 36
  };

export const getTeamRecords = teamLossesObj => ({ type: GET_TEAM_RECORDS, teamLossesObj });

export const fetchTeamRecords = (season, numSeasons) => (dispatch) => {
  return axios.get(`/api/record/${season}?numSeasons=${numSeasons}`)
    .then(res => res.data)
    .then((results) => {
      dispatch(getTeamRecords(results));
    })
    .catch(addError);
}

export default function (state = defaultTeamRecords, action) {
  switch (action.type) {
    case GET_TEAM_RECORDS:
      return action.teamLossesObj;
    default:
      return state;
  }
}
