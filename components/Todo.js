import React, {useState} from 'react';

import {
  Text,
  View
} from 'react-native';

const Todo = (props) => {
  const [text, setText] = useState(props.text ? props.text : 'test');
  const [isCompleted, setIsCompleted] = useState(props.isCompleted ? props.isCompleted : false);
  
  return (
    <View style={{ }}>
      <Text>{text} is {isCompleted ? 'completed' : 'not completed'}</Text>
    </View>
  );
}

export default Todo;