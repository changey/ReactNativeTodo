'user strict';

import _ from 'lodash';

import * as actions from '../actions/actionTypes';
const { ActionFilters } = actions;

const initialState = ActionFilters.ALL;

export default function filterReducer (state = initialState, action) {
  switch (action.type) {
    case actions.SET_FILTER:
      return _.get(action, 'filter', ActionFilters.ALL);
    default:
      return state;
  }
}
