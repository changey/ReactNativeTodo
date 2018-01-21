'use strict';

import React, { Component } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { connect } from 'react-redux';

import _ from 'lodash';

import * as actions from '../actions/actionTypes';

import TopBar from '../components/TopBar';
import TaskRow from '../components/TaskRow';
import Filters from '../components/Filters';

const isAndroid = Platform.OS == "android";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  list: {
    marginTop: 10,
    width: SCREEN_WIDTH * 0.9,
  },
  listContainer: {
    height: SCREEN_HEIGHT * 0.35,
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    width: SCREEN_WIDTH * 0.9,
  },
  contentContainer: {
    paddingTop: 20,
    flex: 1,
  },
  itemTextContainer: {
    marginHorizontal: 10,
  },
});

class TodoList extends Component {
  state = {
    text: "",
    editingText: "",
  }

  addTask = () => {
    const task = this.state.text.trim();
    const isTodoItemNotEmpty = task.length > 0;
    if (!isTodoItemNotEmpty) return;
    this.props.addTask(task);
    this.setState({ text: ""});
  }

  onInputChange = (text) => {
    this.setState({ text: text})
  }

  renderItem = ({ item }) => {
    const taskId = _.get(item, 'taskId');

    return <TaskRow
      item={item}
      toggleTask={this.props.toggleTask}
      deleteTask={this.props.deleteTask}
      editTask={this.props.editTask}
    />
  };

  render() {
    const { filter, tasks, showAll, showCompleted, showActive } = this.props;
    const numberOfActiveItem = _.size(_.filter(tasks, (t) => !t.completed));
    const activeItemText = numberOfActiveItem + " item(s) to be completed";
    const showItemCompleted = filter === actions.ActionFilters.ALL ||
      filter === actions.ActionFilters.ACTIVE;
    const activeItemTextBlock = showItemCompleted ? (
      <View style={styles.itemTextContainer}>
        <Text>{activeItemText}</Text>
      </View>
    ) : null;

    return (
      <View style={styles.container}>
        <TopBar />
        <View style={styles.contentContainer}>
          {activeItemTextBlock}
          <View style={styles.listContainer}>
            <FlatList
              style={styles.list}
              data={tasks}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onInputChange}
            onSubmitEditing={this.addTask}
            value={this.state.text}
            placeholder={"Add a new task"}
            returnKeyType="done"
            returnKeyLabel="done"
          >
          </TextInput>
        </View>
        <Filters
          activeFilter={filter}
          showAll={showAll}
          showCompleted={showCompleted}
          showActive={showActive}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const filter = _.get(state, 'filter', actions.ActionFilters.ALL);
  const tasks = _.get(state, 'tasks', []);
  const filteredTasks = _.filter(tasks, (t) => {
    if (filter === actions.ActionFilters.ALL) {
      return true;
    } else if (filter === actions.ActionFilters.COMPLETED) {
      return _.get(t, 'completed');
    } else if (filter === actions.ActionFilters.ACTIVE) {
      return !_.get(t, 'completed');
    }
  });

  return {
    tasks: filteredTasks,
    filter,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTask: (taskText) => { dispatch({ type: actions.ADD_TASK, taskText }) },
  deleteTask: (taskId) => { dispatch({ type: actions.DELETE_TASK, taskId }) },
  toggleTask: (taskId) => { dispatch({ type: actions.TOGGLE_TASK, taskId }) },
  editTask: (taskId, text) => { dispatch({ type: actions.EDIT_TASK, taskId, text }) },
  showAll: () => { dispatch({ type: actions.SET_FILTER, filter: actions.ActionFilters.ALL }) },
  showCompleted: () => { dispatch({ type: actions.SET_FILTER, filter: actions.ActionFilters.COMPLETED })},
  showActive: () => { dispatch({ type: actions.SET_FILTER, filter: actions.ActionFilters.ACTIVE }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
