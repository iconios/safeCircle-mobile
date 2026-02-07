import Constants from "expo-constants";

const validateApiUrl = () => {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  if (!apiUrl) {
    throw new Error("Api Url required");
  }

  return apiUrl;
};

export default validateApiUrl;
