'use strict';

import _ from 'lodash';
import uuidv4 from 'uuid/v4';

import * as actions from '../actions/actionTypes';

// Provide an intial state so it's easier for development
// Set the initialState to [] when we don't want any initial tasks
const initialState = [
  {
    taskId: uuidv4(),
    text: 'Bake Cookies',
    completed: false,
  },
  {
    taskId: uuidv4(),
    text: 'Grocery Shopping',
    completed: true,
  },
  {
    taskId: uuidv4(),
    text: 'Grocery Shopping',
    completed: true,
  },
];

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TASK:
      const taskText = _.get(action, 'taskText', '');
      const newTask = {
        taskId: uuidv4(),
        completed: false,
        text: taskText,
      };
      return [
        ...state,
        newTask,
      ]
    case actions.DELETE_TASK:
      const toRemoveTaskId = _.get(action, 'taskId');
      return _.remove(state, (t) => {
        return _.get(t, 'taskId', '') !== toRemoveTaskId;
      });
    case actions.TOGGLE_TASK:
      const toToggleTaskId = _.get(action, 'taskId');
      return _.map(state, (t) => {
        if (_.get(t, 'taskId', '') === toToggleTaskId) {
          t.completed = !t.completed;
        }
        return t;
      });
    case actions.EDIT_TASK:
      const toEditTaskId = _.get(action, 'taskId');
      const newTaskText = _.get(action, 'text');
      return _.map(state, (t) => {
        if (_.get(t, 'taskId', '') === toEditTaskId) {
          t.text = newTaskText;
        }
        return t;
      });
    default:
      console.log("foo state", state)
      return state;
  }
}
