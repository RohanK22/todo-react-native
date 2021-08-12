import React, {useState} from 'react';
import {
  SafeAreaView, View,Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} /> 
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
