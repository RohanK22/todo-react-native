import React, {useState} from 'react';
import Todo from './components/Todo';
import {
  Alert,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([<Todo key="alskjdf" />]);
  
  function addNewTodo() {
    todos.push(<Todo key={todos.length} text="test" />);  }

  return (
    <SafeAreaView style={styles.root}>
      <Button onPress={addNewTodo} title='+' style={styles.button}></Button>
      {todos.forEach((todo) => {
        return (
          todo
        );
      })}
    </SafeAreaView>
  );
};  


const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f0ffff',
    flex:1
  },  
  button: {
    position: 'absolute',
    top: 50,
    marginTop: 100, 
    bottom: 0,
    right: 0,
  },  
  text: {
    fontSize: 25,    
  },
});

export default App;
