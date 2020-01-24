import { combineReducers } from 'redux';

import { beersReducer } from '../Beers/model/reducer';

const rootReducer = combineReducers({ beersReducer });

export default rootReducer;
