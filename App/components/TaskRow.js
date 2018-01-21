'use strict';

import React, { Component } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import _ from 'lodash';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  listItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rowTaskInput: {
    fontSize: 14,
    height: 40,
    width: SCREEN_WIDTH * 0.5,
  },
  mainItem: {
    paddingLeft: 5,
    width: SCREEN_WIDTH * 0.75,
    flexDirection: 'row',
    alignItems: "center",
  },
  nonEditableText: {
    fontSize: 14,
  },
  nonEditableTextContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  checkBox: {
    marginRight: 5,
  }
});

import Unchecked from '../img/unchecked.png';
import Checked from '../img/checked.png';

const ANIMATION_LENGTH = 300;

class TaskRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  render() {
    const { item } = this.props;
    const taskId = _.get(item, 'taskId');
    const imgSrc = _.get(item, 'completed', false) ? Checked : Unchecked;
    const textValue = _.get(item, 'text', '');

    return (
      <View>
        <View style={styles.listItemRow}>
          <View style={styles.mainItem}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => this.props.toggleTask(taskId)}
            >
              <Image source={imgSrc}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ editing: true })}
            >
            {
              this.state.editing ? (
                <TextInput
                  style={styles.rowTaskInput}
                  onChangeText={(text) => this.props.editTask(taskId, text)}
                  value={textValue}
                  returnKeyType="done"
                  returnKeyLabel="done"
                />
              ) : (
                <View style={styles.nonEditableTextContainer}>
                  <Text style={styles.nonEditableText}>
                    {textValue}
                  </Text>
                </View>
              )
            }
            </TouchableOpacity>
          </View>
          {
            this.state.editing ? (
              <Button title="Done" onPress={() => this.setState({ editing: false })} />
            ) : (
              <Button title="X" onPress={() => this.props.deleteTask(taskId)} />
            )
          }
        </View>
      </View>
    )
  }
}

export default TaskRow;
