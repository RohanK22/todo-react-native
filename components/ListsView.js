import React, {Component} from 'react';
import {Modal, View, Text, StyleSheet, Alert, TextInput, ScrollView} from 'react-native';
import retrieveDataByKey from '../db/retrieveData';
import storeDataByKey from '../db/storeData';
import List from './List';
import TextInputComponent from './TextInput';
import defaultList from '../db/defaultList';

class ListsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: null, // {data: ['defaultList', ...]
      modalVisible: false,
    };
    this.navigateToTodo = this.navigateToTodo.bind(this);
    this.showAddListModal = this.showAddListModal.bind(this);
    this.addNewList = this.addNewList.bind(this);
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
    });
  }

  async deleteTodoList(listName) {
    let list = await retrieveDataByKey('@' + listName);
    let updatedList = list.data.filter(
      ln => ln !== listName,
    );  
    await storeDataByKey('@LISTS', updatedList);
    this.setState({
      list: updatedList.data,
    })
  }

  showAddListModal() {
    this.setState({
      modalVisible: true,
    });
  }

  async addNewList(text) {
    // validate text, create new list, and navigate to list
    if (text.trim().length != 0) {
      text = text.trim();
      console.log('Adding new todo list named ' + text);

      let listKeys = await retrieveDataByKey('@LISTS');
      console.log(listKeys);
      listKeys['data'].push(text);
      console.log('Lists: ' + listKeys)
      await storeDataByKey('@LISTS', listKeys);
      
      defaultList['title'] = text;
      defaultList.todos = [];
      await storeDataByKey('@' + text, defaultList);

      this.setState({
        lists: await retrieveDataByKey('@LISTS'),
        modalVisible: false,
      });
    }
  }

  render() {
    let cards = null,
      modalComponent = null;

    if (this.state.lists && this.state.lists.data) {
      console.log(this.state.lists.data);
      cards = this.state.lists.data.map((element, i) => {
        return (
          <Text
            key={i}
            style={styles.listView}
            onPress={() => {
              console.log('Navigating to ' + element + ' list');
              this.navigateToTodo(element);
            }}
            onLongPress={async () => {
              console.log('Deleting List ' + element);
              await this.deleteTodoList(element);
            }}
            >
            {element}
          </Text>
        );
      });
    }

    if (this.state.modalVisible) {
      modalComponent = (
        <View>
          <Modal
            animationType="slide"
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({
                modalVisible: false,
              });
            }}>
            <Text>List Name</Text>
            <TextInputComponent addNewList={this.addNewList} />
          </Modal>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        {modalComponent}
        {cards != null ? cards : <Text>Error</Text>}
        {
          <Text
            style={[
              styles.listView,
              {backgroundColor: 'green', fontWeight: 'bold'},
            ]}
            onPress={this.showAddListModal}>
            Add New List
          </Text>
        }
      </ScrollView>
    );
  }
}

const colours = ['yellowgreen', 'teal', 'steelblue', 'wheat', 'violet', 'turquoise', 'thistle'];

const styles = StyleSheet.create({
  listView: {
    backgroundColor: colours[Math.floor(Math.random(0, 1) * colours.length)],
    color: 'white',
    height: '20%',
    width: '80%',
    margin: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
});

export default ListsView;
