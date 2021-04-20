import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { profileReducer } from './profileReducer';

// combine reducers into root reducer
const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
});

export default rootReducer;