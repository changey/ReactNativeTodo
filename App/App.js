import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import store from './store.js';
import TodoList from './containers/TodoList.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <TodoList/>
        </View>
      </Provider>
    );
  }
}
