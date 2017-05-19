import { combineReducers } from 'redux'

import user from './User';

function testReducer(state={}, action) {
    return state;
}

export default combineReducers({
    user,
    test: testReducer
});
