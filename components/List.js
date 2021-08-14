import React, {Component} from 'react';
import {Alert, ScrollView, TouchableOpacity, Text, StyleSheet, View, TextInput} from 'react-native';
import Todo from './Todo';
import Icon from 'react-native-vector-icons/FontAwesome';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    text: 'Wash dishes',
                    isCompleted: false,
                },
                {
                    text: 'Take out trash',
                    isCompleted: false,
                },
                {
                    text: 'Get Veggies',
                    isCompleted: false,
                }
            ],
            textInputValue: '',
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    onChangeInput(text) {
        this.setState({
            textInputValue: text
        });
    }

    addTodo() {
        if(this.state.textInputValue.length != 0) {
            this.state.todos.push({
                text: this.state.textInputValue,
                isCompleted: false,
            });
            console.log(this.state.todos);
            this.setState({
                textInputValue: ''
            });
        }
    }
    
    render(){
        const todoComponents = this.state.todos.map((todo, i) => {
            return <Todo key={i} text={todo.text} isCompleted={todo.isCompleted} />
        });

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
                    <TouchableOpacity style={styles.addTodoButton} onPress={this.addTodo}><Icon name="plus" size={30} /></TouchableOpacity>
                </View>
                <ScrollView style={styles.listView}>
                    {todoComponents}
                </ScrollView>
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
        backgroundColor: "green",
        borderRadius: 40,
    }
});

export default List;