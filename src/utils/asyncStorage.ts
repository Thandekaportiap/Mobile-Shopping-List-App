import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data to AsyncStorage
export const saveToStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to storage (${key}):`, error);
  }
};

// Load data from AsyncStorage
export const loadFromStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error loading from storage (${key}):`, error);
  }
};

// Remove data from AsyncStorage
export const removeFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error);
  }
};
