import React, {useState, useEffect, Component} from 'react';
import {SafeAreaView, View, Text, Button, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import List from './components/List';
import ListView from './components/ListsView';

import AsyncStorage from '@react-native-community/async-storage';
import retrieveDataByKey from './db/retrieveData';
import storeDataByKey from './db/storeData';

import defaultList from './db/defaultList';

const Stack = createNativeStackNavigator();

let listToLoad = null;
const STORAGE_KEY = '@LISTS';

class App extends Component {
  // Load data on App load

  constructor(props) {
    super(props);
    this.state = {
      lists: null,
    };
  }

  readData = async () => {
    try {
      const listKeys = await retrieveDataByKey(STORAGE_KEY); // Should give back { data: ['defaultList']}
      if (listKeys === null) {
        // No previously stored data or new user
        // Add defaultList to lists and memory
        const defaultListsObjWithArr = {data: ['defaultList']};
        await storeDataByKey(STORAGE_KEY, defaultListsObjWithArr);
        await storeDataByKey('@defaultList', defaultList);
        this.setState({
          lists: defaultListsObjWithArr,
        });
        console.log('New User: ' + JSON.stringify(this.state.lists));
      } else {
        this.setState({
          lists: listKeys, // Obj
        });
        console.log('Existing User: ' + JSON.stringify(listKeys));
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage: ' + e);
    }
  };

  saveData = async () => {
    try {
      await storeDataByKey(STORAGE_KEY, this.state.lists);
      // console.log('Data successfully saved');
    } catch (e) {
      console.log('Failed to save the data to the storage: ' + e);
    }
  };

  clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage successfully cleared!');
    } catch (e) {
      console.log('Failed to clear the async storage: ' + e);
    }
  };

  async componentWillUnmount() {}

  async componentDidMount() {
    await this.clearStorage();
    await this.readData();
  }

  render() {
    console.log('App Render Called');
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="My Todo Lists" component={ListView} />

          <Stack.Screen name="List" component={List}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
