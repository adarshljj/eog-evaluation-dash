import * as Reducer from './reducer';

const redux = require('redux');

export const store = redux.createStore(Reducer.reducer);
