'use strict';

import { combineReducers } from 'redux';
import taskReducer from './task';
import filterReducer from './filters';

export default combineReducers({
  tasks: taskReducer,
  filter: filterReducer,
});
