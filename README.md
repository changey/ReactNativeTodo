# ReactNativeTodo

![alt text](https://raw.githubusercontent.com/changey/ReactNativeTodo/master/readmeImg/demo.gif)

### A To-Do App

It's an interesting challenge. Even though a to-do app may seem fundamental, it demonstrates many of the common actions for changing states like add, delete, edit, filter...

Redux is a popular architecture and it's a nice tool to provide predictable state for js apps. This app is designed with persisting data in Redux state in mind. One of the most basic object that we want to keep track of for todo tasks is a `task`, which has the attributes of `taskId`, `text`, `completed`. Thus, in the Redux state, we're keeping track of tasks like

```json
{
  "tasks": [
    {
      "taskId": "123",
      "text": "Bake Cookies",
      "completed": false,
    },
    {
      "taskId": "456",
      "text": "Grocery Shopping",
      "completed": false,
    }
  ]
}
```

### Actions, Reducers
We need to handle actions like

* Add a to do item
* Mark to do item as done
* Delete a to-do item

These are very good cases to use reducers to handle since these actions manipulate the state. The actions are defined in `App/actions/actionTypes.js` and the reducer is `App/reducers/task.js`. Along with it, we have the corresponding jest test in `App/reducers/__tests__/task-spec.js` to make sure all the functionalities are correct.

Since we already have the tasks in the redux state, to display the number of items left to be completed, we can just filter the tasks with the attribute `completed: false` and get the number of tasks that need to be completed.

To edit a to-do item, it's a common UX that the users will need to click on the text that they want to edit and then edit the text. In React-Native, `TextInput` can be editable while `Text` isn't editable. Thus, we can use the state within the `TaskRow` component to check whether the user is in an editing state or not. When the user clicks on the initial uneditable `Text`, the text becomes editable. Then, when the user clicks the `Done` button, we trigger the `EDIT_TASK` action to update the text and then the task is composed of the static `Text` component again. Each TaskRow is an independent component so they don't affect each other.

Regarding filtering between completed and active items, we can use the Redux state to keep track of which filter state the user is in. There are `All`, `Completed`, and `Active` filter states. The specific action for setting the filter state is `SET_FILTER` and we can find the logic in `App/reducers/filter.js`. Since we have the filter information in the redux state, we can use it to filter the tasks that we want to display.

### Jest Test
For redux apps, one of the most important part that we can test are the reducers since they handle all the actions. The test files are in `App/reducers/__tests__`. We want to test all functionalities and edge cases like when it starts with the initialState, when we do the same action twice...

![alt text](https://raw.githubusercontent.com/changey/ReactNativeTodo/master/readmeImg/tests.png)

### Animations

There are tools like `Animated`, `LayoutAnimation`... that can be used for animation. Great animations can take lots of time. For demonstration purpose, `Animated` is used in `App/Components/TaskRow.js` to add animation when adding a new to-do task. Essentially we can define the timing for the animation

```jsx
componentDidMount() {
    Animated.timing(this.animated, {
      duration: ANIMATION_LENGTH,
      toValue: 1,
    }).start();
  }
```

and the specific animation we'd like to perform

```jsx
const listRowStyle = [
    { opacity: this.animated },
    {
      transform: [
        { scale: this.animated },
        {
          rotate: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['30deg', '0deg'],
          })
        }
      ],
    },
  ]
```
We can update the animation based on the input from business and design.

### Final thoughts

It's great to create another app from scratch. The app covers many of the fundamental actions like add, update, delete, filter... No matter how complicated an app is, the architecture is always very important. An app with a good architecture can be more easily updated. It's nice to go through these concepts with real implementation.
