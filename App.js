import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Button, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ListView from './components/ListsView';
import List from './components/List';

import AsyncStorage from "@react-native-community/async-storage";
import retrieveDataByKey from './db/retrieveData';
import storeDataByKey from './db/storeData';

let listToLoad = null;
const defaultList = {
  title: 'Sample List',
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
    },
  ],
  textInputValue: '',
};
// retrieveDataByKey('@LISTS', keysToLists => {
//   if (!keysToLists) {
//     // New user
//     const defaultList = {
//       title: 'Sample List',
//       todos: [
//         {
//           text: 'Wash dishes',
//           isCompleted: false,
//         },
//         {
//           text: 'Take out trash',
//           isCompleted: false,
//         },
//         {
//           text: 'Get Veggies',
//           isCompleted: false,
//         },
//       ],
//       textInputValue: '',
//     };
//     storeDataByKey('defaultList', defaultList);
//     storeDataByKey('@LISTS', ['defaultList']);
//     listToLoad = defaultList;
//     console.log('New user: ' + listToLoad);
//   } else {
//     // Do something else
//     console.log('test');
//     listToLoad = {};
//     listToLoad = retrieveDataByKey('activeList');
//   }
// });
// console.log(listToLoad);

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('SampleList', {
            list: listToLoad,
          })
        }
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  // Load data on App load
  const STORAGE_KEY = '@LISTS';
  const [lists, setLists] = useState([]);

  const readData = async () => {
    try {
      const lists = await retrieveDataByKey(STORAGE_KEY);

      if (lists !== null) {
        console.log(lists);
        setLists(lists);

        // For now show the default list
        listToLoad = await retrieveDataByKey('@' + lists[0]);
        
      } else {
        // If no pre existing data is found
        await storeDataByKey('@defaultList', defaultList);
        await storeDataByKey('@LISTS', ['defaultList']);
        listToLoad = defaultList;
        console.log('New user: ' + JSON.stringify(listToLoad));
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };

  const saveData = async () => {
    try {
      await storeDataByKey(STORAGE_KEY, lists);
      alert('Data successfully saved');
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage: ' + e);
    }
  };

  useEffect(() => {
    readData();
  }, []);

  useEffect((lists) => {
    saveData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SampleList" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   root: {
//     backgroundColor: '#f0ffff',
//     flex:1
//   },
//   button: {
//     position: 'absolute',
//     top: 50,
//     marginTop: 100,
//     bottom: 0,
//     right: 0,
//   },
//   text: {
//     fontSize: 25,
//   },
// });

export default App;
