import * as SecureStore from "expo-secure-store";

const saveInStore = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.warn("Failed to save deviceId in store", error);
  }
};

const retrieveFromStore = async (key: string) => {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (!result) {
      return null;
    }

    return result;
  } catch (error) {
    console.error("Failed to retrieve deviceId", error);
  }
};

export { saveInStore, retrieveFromStore };
