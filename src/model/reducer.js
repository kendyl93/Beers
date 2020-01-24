import { combineReducers } from 'redux';

import { beersReducer } from '../Beers/reducer';

const rootReducer = combineReducers({ beersReducer });

export default rootReducer;
