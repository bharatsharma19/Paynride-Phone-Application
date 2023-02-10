import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, body) => {
  try {
    //console.log(body);
    await AsyncStorage.setItem(key, JSON.stringify(body));
  } catch (e) {
    console.log('Error in setting Data ' + key, e);
  }
};

export const getStoreData = async key => {
  try {
    var data = await AsyncStorage.getItem(key);

    return JSON.parse(data);
  } catch (e) {
    console.log('Error in getting Data ' + key, e);
    return null;
  }
};

export const removeStoreData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error in removing Data ' + key, e);
  }
};
