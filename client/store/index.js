import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import error from './error';
import results from './results';
import type from './type';
import combos from './combos';
import season from './season';
import numPicks from './numPicks';
import numSims from './numSims';

const reducer = combineReducers({ error, results, type, combos, season, numPicks, numSims });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware);

export default store;
export * from './error';
export * from './results';
export * from './type';
export * from './combos';
export * from './season';
export * from './numPicks';
export * from './numSims';
