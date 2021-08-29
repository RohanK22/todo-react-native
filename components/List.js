import React, {Component} from 'react';
import storeDataByKey from '../db/storeData';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import Todo from './Todo';
import Icon from 'react-native-vector-icons/FontAwesome';

class List extends Component {
  constructor(props) {
    super(props);
    const {list} = this.props.route.params;
    if (list === null) return;
    console.log(JSON.stringify(list));
    this.state = list; // Object
    this.onChangeInput = this.onChangeInput.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.changeTodoState = this.changeTodoState.bind(this);
  }

  onChangeInput(text) {
    this.setState({
      textInputValue: text,
    });
  }

  addTodo() {
    if (this.state.textInputValue.length != 0) {
      this.state.todos.push({
        text: this.state.textInputValue,
        isCompleted: false,
      });
      console.log(this.state.todos);
      this.setState({
        textInputValue: '',
      });
    }
    // await storeDataByKey('@' + this.state.list.title, this.state.list);
  }

  deleteTodo(todoTextToRemove) {
    if (!todoTextToRemove || !this.state.todos) return;
    const updatedList = this.state.todos.filter(
      todo => todo.text !== todoTextToRemove,
    );
    console.log(updatedList);
    this.setState({
      todos: updatedList,
    });
    // await storeDataByKey('@' + this.state.list.title, this.state.list);
  }

  changeTodoState(todoText) {
    if (!todoText || !this.state.todos) return;
    let updatedList = [];
    
    for(num in this.state.todos){
      let i = this.state.todos[num];
      console.log(JSON.stringify(i));
      if(i.text === todoText) {
        i.isCompleted = !i.isCompleted;
        updatedList.push(i);
        continue; 
      }
      updatedList.push(i);
    }

    console.log("Changing todos to : " + updatedList);
    this.setState({
      todos: updatedList,
    });
    // await storeDataByKey('@' + this.state.list.title, this.state.list);
  }

  render() {
    if (!this.state.todos)
      return (
        <View>
          <Text>Todo Not Found! </Text>
        </View>
      );

    const todoComponents = this.state.todos.map((todo, i) => {
      return (
        <Todo
          key={i}
          text={todo.text}
          isCompleted={todo.isCompleted}
          deleteTodo={this.deleteTodo}
          changeTodoState={this.changeTodoState}
        />
      );
    });
    
    storeDataByKey('@' + this.state.title, this.state);

    return (
      <ScrollView>
        <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
          <TextInput
            style={styles.input}
            placeholder="Todo..."
            backgroundColor="black"
            onChangeText={text => this.onChangeInput(text)}
            value={this.state.textInputValue}
          />
          <TouchableOpacity style={styles.addTodoButton} onPress={this.addTodo}>
            <Icon name="plus" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.listView}>{todoComponents}</ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  input: {
    flex: 6,
    borderRadius: 40,
  },
  addTodoButton: {
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: 'green',
    borderRadius: 40,
  },
});

export default List;
