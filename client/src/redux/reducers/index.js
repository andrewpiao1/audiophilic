import { combineReducers } from 'redux';
import user from './user-reducer';

//combine all reducers in rootReducer

const rootReducer = combineReducers({
  user
})

export default rootReducer