import React, {useState} from 'react';

import {
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';

const Todo = (props) => {
  const [text, setText] = useState(props.text ? props.text : 'test');
  const [isCompleted, setIsCompleted] = useState(props.isCompleted ? props.isCompleted : false);
  
  function changeTodoCompletedStatus() {
    setIsCompleted(!isCompleted);
  }

  return (
    <View style={isCompleted? styles.todoViewCompleted: styles.todoView}>
      <Text style={isCompleted? styles.todoTextCompleted: styles.todoText} onPress={changeTodoCompletedStatus} onLongPress={() => props.deleteTodo(text)}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todoView: {
    padding: 10,
    margin: 5,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  todoViewCompleted: {
    padding: 10,
    margin: 5,
    borderRadius: 50,
    backgroundColor: '#90EE90',
  },
  todoText: {
    fontSize: 17,
    fontFamily: 'monospace, Georgia, serif',
  },
  todoTextCompleted: {
    fontSize: 17,
    fontFamily: 'monospace, Georgia, serif',
    textDecorationLine: 'line-through',
  }, 
  completedButton: {
    height: 5,
    width: 5,
    borderRadius: 2.5,
  }
});

export default Todo;