import taskReducer from '../task.js'
import * as actions from '../../actions/actionTypes';

describe('reducers', () => {
  describe('taskReducer', () => {
    it('should provide the initial state', () => {
      expect(true).toBe(false);
    })

    it('should handle ADD_TASK action', () => {
        const newState = taskReducer([], {
          type: actions.ADD_TASK,
          taskText: 'Bake Cookies',
        })
        expect(newState.length).toBe(1);
        expect(newState[0].text).toBe('Bake Cookies');

        const newState2 = taskReducer([{
          text: 'Bake Cookies',
        }], {
          type: actions.ADD_TASK,
          taskText: 'Grocery Shopping',
        })
        expect(newState.length).toBe(2);
        expect(newState[0].text).toBe('Bake Cookies');
        expect(newState[1].text).toBe('Grocery Shopping');
    });
  })
})
