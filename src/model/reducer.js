import { combineReducers } from 'redux';

import { beersReducer } from '../Beers/model/reducer';
import { paginationReducer } from '../Beers/Pagination/reducer';

const rootReducer = combineReducers({ beersReducer, paginationReducer });

export default rootReducer;
