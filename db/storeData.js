import {AsyncStorage} from '@react-native-community/async-storage';

const storeDataByKey = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
    console.log('Storing ' + data + " under key: " + key);
  } catch (error) {
    console.log('Error Saving Data');
  }
};

export default storeDataByKey;