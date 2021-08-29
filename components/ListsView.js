import React, {Component} from 'react';
import {Modal, View, Text, StyleSheet, Alert} from 'react-native';
import retrieveDataByKey from '../db/retrieveData';
import List from './List';


class ListsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: null, // {data: ['defaultList', ...]
      modalVisible: false,
    };
    this.navigateToTodo = this.navigateToTodo.bind(this);
  }

  async componentDidMount() {
    this.setState({
      lists: await retrieveDataByKey('@LISTS'),
    });
    console.log('Changed lists: ' + this.state.lists);
  }

  async navigateToTodo(listName) {
    const list = await retrieveDataByKey('@' + listName);
    this.props.navigation.navigate('List', {
      list: list,
    })
  }

  render() {
    let cards = null;

    if (this.state.lists && this.state.lists.data) {
      console.log(this.state.lists.data);
      cards = this.state.lists.data.map((element, i) => {
        return (
          <Text key={i} style={styles.listView} onPress={() => {
            console.log('Navigating to ' + element + ' list')
            this.navigateToTodo(element);            
          }}>
            {element}
          </Text>
        );
      });
    }

    return (
      <View style={styles.container}>
        {cards != null ? cards : <Text>Error</Text>}
        {
          <Text
            style={[
              styles.listView,
              {backgroundColor: 'green', fontWeight: 'bold'},
            ]}>
            Add New List
          </Text>
        }
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: 'powderblue',
    color: 'white',
    height: 150,
    flex: 0.5,
    margin: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    fontSize: 20,
  },
  container: {
    flexDirection: 'row',
  },
});

export default ListsView;
