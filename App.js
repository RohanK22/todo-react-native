import React from 'react';
import {SafeAreaView, View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ListView from './components/ListsView';
import List from './components/List';

import {AsyncStorage} from '@react-native-community/async-storage';

// Try const previous lists (if saved previously)
const defaultList = retrieveDataByKey('currentList');

// If no previously saved lists are found then create a default template
if (!defaultList) {
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
  storeDataByKey('defaultList', defaultList);
}

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('SampleList', {
          list: lists[0]
        })}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
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
