'use strict';

import React, { Component } from "react";
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    paddingTop: 35,
  },
  barTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#79CDCD',
    textAlign: 'center',
  },
});

class TopBar extends Component {
  render() {
    return (
      <View style={styles.topBar}>
        <Text style={styles.barTitle}>My Tasks</Text>
      </View>
    )
  }
}

export default TopBar;
