import { combineReducers } from 'redux'

import user from './User';
import beaches from './Beaches';
import querying from './Querying';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export default combineReducers({
    user,
    beaches,
    querying,
    routing: routerReducer
});
