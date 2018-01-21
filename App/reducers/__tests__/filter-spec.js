import filterReducer from '../filter.js'
import * as actions from '../../actions/actionTypes';
const { ActionFilters } = actions;

describe('filterReducer', () => {
  it('should provide the initial state', () => {
      const initialState = filterReducer(undefined, {});
      expect(initialState).toBe(ActionFilters.ALL);
  });

  it('should set the filter state accoring to the state given', () => {
    const newState = filterReducer(ActionFilters.ALL, {
      type: actions.SET_FILTER,
      filter: ActionFilters.COMPLETED
    });
    expect(newState).toBe(ActionFilters.COMPLETED);

    const newState2 = filterReducer(ActionFilters.ALL, {
      type: actions.SET_FILTER,
      filter: ActionFilters.ACTIVE
    });
    expect(newState2).toBe(ActionFilters.ACTIVE);

    const newState3 = filterReducer(ActionFilters.ACTIVE, {
      type: actions.SET_FILTER,
      filter: ActionFilters.ALL
    });
    expect(newState3).toBe(ActionFilters.ALL);
  });

  it('shouldn\'t change the filter if the same filter state is given', () => {
    const newState = filterReducer(ActionFilters.ALL, {
      type: actions.SET_FILTER,
      filter: ActionFilters.ALL
    });
    expect(newState).toBe(ActionFilters.ALL);
  });
})
