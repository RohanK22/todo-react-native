import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import defaultList from '../db/defaultList';
import storeDataByKey from '../db/storeData';
import retrieveDataByKey from '../db/retrieveData';

const TextInputComponent = (props) => {
  const [text, onChangeText] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="List Name"
      />
      <Button
        onPress={async () => {
            await props.addNewList(text);
        }}
        title="Create List"
        color="#841584"
        accessibilityLabel="Create List"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});

export default TextInputComponent;
