import taskReducer from '../task.js'
import * as actions from '../../actions/actionTypes';

describe('taskReducer', () => {
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
      expect(newState2.length).toBe(2);
      expect(newState2[0].text).toBe('Bake Cookies');
      expect(newState2[1].text).toBe('Grocery Shopping');
  });

  it('should handle DELETE_TASK action', () => {
    const newState = taskReducer([
      {
        taskId: '1',
        text: 'Bake Cookies',
      },
      {
        taskId: '2',
        text: 'Go Exercise',
      },
    ], {
      type: actions.DELETE_TASK,
      taskId: '1',
    });

    expect(newState.length).toBe(1);
    expect(newState[0].text).toBe('Go Exercise');
  });

  it('should handle TOGGLE_TASK action', () => {
    const newState = taskReducer([
      {
        taskId: '1',
        text: 'Bake Cookies',
        completed: false,
      },
      {
        taskId: '2',
        text: 'Go Exercise',
        completed: false,
      },
    ], {
      type: actions.TOGGLE_TASK,
      taskId: '1',
    });

    expect(newState.length).toBe(2);
    expect(newState[0].completed).toBe(true);
    expect(newState[1].completed).toBe(false);

    const newState2 = taskReducer([
      {
        taskId: '1',
        text: 'Bake Cookies',
        completed: true,
      },
      {
        taskId: '2',
        text: 'Go Exercise',
        completed: true,
      },
    ], {
      type: actions.TOGGLE_TASK,
      taskId: '1',
    });

    expect(newState2.length).toBe(2);
    expect(newState2[0].completed).toBe(false);
    expect(newState2[1].completed).toBe(true);
  });

  it('should handle EDIT_TASK action', () => {
    const newState = taskReducer([
      {
        taskId: '1',
        text: 'Bake Cookies',
        completed: false,
      },
      {
        taskId: '2',
        text: 'Go Exercise',
        completed: false,
      },
    ], {
      type: actions.EDIT_TASK,
      taskId: '1',
      text: 'Grocery Shopping',
    });

    expect(newState.length).toBe(2);
    expect(newState[0].text).toBe('Grocery Shopping');
    expect(newState[1].text).toBe('Go Exercise');
  });
})
