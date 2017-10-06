import axios from 'axios';
import { addError } from './error';

const GET_TEAM_RECORDS = 'GET_TEAM_RECORDS';

const defaultTeamRecords = {
  "season": 2015,
  "ATL": 22,
  "BOS": 42,
  "BKN": 44,
  "CHA": 49,
  "CHI": 32,
  "CLE": 29,
  "DAL": 32,
  "DEN": 52,
  "DET": 50,
  "GSW": 15,
  "HOU": 26,
  "IND": 44,
  "LAC": 26,
  "LAL": 61,
  "MEM": 27,
  "MIA": 45,
  "MIL": 41,
  "MIN": 66,
  "NOP": 37,
  "NYK": 65,
  "OKC": 37,
  "ORL": 57,
  "PHI": 64,
  "PHX": 43,
  "PDX": 31,
  "SAC": 53,
  "SAS": 27,
  "TOR": 33,
  "UTA": 44,
  "WAS": 36
  };

export const getTeamRecords = teamLossesObj => ({ type: GET_TEAM_RECORDS, teamLossesObj });

export const fetchTeamRecords = (season, numSeasons) => (dispatch) => {
  return axios.get(`/api/record/${season}?numSeasons=${numSeasons}`)
    .then(res => res.data)
    .then(results => dispatch(getTeamRecords(results)))
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
