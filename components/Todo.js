import React, {useState} from 'react';

import {
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  TextInput,
} from 'react-native';

const Todo = (props) => {
  const [text, setText] = useState(props.text ? props.text : 'test');

  return (
      <Text style={styles.text}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,    
  },
});


export default Todo;