import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Todo from './Todo';

class List extends Component {
    state = {
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
        ]
    }
    
    render(){
        const todoComponents = this.state.todos.map((todo, i) => {
            return <Todo key={i} text={todo.text} isCompleted={todo.isCompleted} />
        });

        return (
            <View>
                {todoComponents}
            </View>
        );        
    }
}

export default List;