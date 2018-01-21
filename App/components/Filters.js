'use strict';
import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';

import _ from 'lodash';
import uuidv4 from 'uuid/v4';

import { ActionFilters } from '../actions/actionTypes';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#79CDCD',
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    paddingTop: 36,
    paddingBottom: 36,
  },
  current: {
    backgroundColor: '#388EBE'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

class Filters extends Component {
  renderTabs() {
    const { showAll, showCompleted, showActive, activeFilter } = this.props;

    const filters = [
      {name: ActionFilters.ALL, action: showAll},
      {name: ActionFilters.COMPLETED, action: showCompleted},
      {name: ActionFilters.ACTIVE, action: showActive},
    ];
    return _.map(filters, (f) => {
      const style = [styles.button];
      const filterName = _.get(f, 'name', '');
      if (filterName === activeFilter) {
        style.push(styles.current);
      }
      return (
        <TouchableOpacity
          style={style}
          onPress={f.action}
          key={uuidv4()}
        >
          <Text style={styles.text}>{_.capitalize(filterName)}</Text>
        </TouchableOpacity>
      )
    });
  }

  render() {
    return (
      <View style={styles.bar}>
        {this.renderTabs()}
      </View>
    )
  }
}

export default Filters;
