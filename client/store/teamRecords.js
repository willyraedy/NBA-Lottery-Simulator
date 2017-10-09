import axios from 'axios';
import { addError } from './error';

const GET_TEAM_RECORDS = 'GET_TEAM_RECORDS';

const defaultTeamRecords = {
  ATL: 39,
  BKN: 62,
  BOS: 29,
  CHA: 46,
  CHI: 41,
  CLE: 31,
  DAL: 49,
  DEN: 42,
  DET: 45,
  GSW: 15,
  HOU: 27,
  IND: 40,
  LAC: 31,
  LAL: 56,
  MEM: 39,
  MIA: 41,
  MIL: 40,
  MIN: 51,
  NOP: 48,
  NYK: 51,
  OKC: 35,
  ORL: 53,
  PDX: 41,
  PHI: 54,
  PHX: 58,
  SAC: 50,
  SAS: 21,
  TOR: 31,
  UTA: 31,
  WAS: 33,
  season: 2017,
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
