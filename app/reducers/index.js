import { combineReducers } from 'redux';
import counter from './counter';
import reducer from './reducer';

const rootReducer = combineReducers({
  counter,
  reducer
});

export default rootReducer;
