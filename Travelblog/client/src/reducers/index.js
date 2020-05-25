import loggedReducer from './isLogged';
import {combineReducers} from 'redux';

// This is mainly used if we got more than one reducer
const allReducers = combineReducers({
    isLogged: loggedReducer
});

export default allReducers;
