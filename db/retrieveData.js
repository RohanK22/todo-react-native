import {AsyncStorage} from '@react-native-community/async-storage';

const retrieveDataByKey = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      console.log(data);
    }
    return data;
  } catch (error) {
    console.log('Error fetching stored data');
  }
};

export default retrieveDataByKey;