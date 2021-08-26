import AsyncStorage from "@react-native-community/async-storage";

const retrieveDataByKey = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    data = data != null ? JSON.parse(data) : null;
    if (data !== null) {
      console.log(data);
    }
    return data;
  } catch (error) {
    console.log('Error fetching stored data: ' + error);
  }
};

export default retrieveDataByKey;