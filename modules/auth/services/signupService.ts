/*
#Plan:
1. Receive and validate the user data
2. Pass the user data to the backend server
3. Return the server response to the client
*/

import { ZodError } from "zod";
import {
  signUpAuthServerResponseType,
  signupServiceInputSchema,
  signupServiceInputType,
} from "../types/signup.types";
import Constants from "expo-constants";

const validateApiUrl = () => {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  if (!apiUrl) {
    throw new Error("Api Url required");
  }

  return apiUrl;
};

const signupService = async (signupUserData: signupServiceInputType) => {
  const API_URL = validateApiUrl();
  console.log("API URL:", API_URL);
  try {
    // 1. Receive and validate the user data
    console.log("validated input", signupUserData);
    const validatedInput = signupServiceInputSchema.parse(signupUserData);

    // 2. Pass the user data to the backend server
    const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedInput),
    });

    const result: signUpAuthServerResponseType = await response.json();
    console.log("Signup data", result);

    if (!result.success || result.error) {
      throw new Error(result.message || "Signup request failed");
    }

    return result.message;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Signup validation error:", error.flatten());
      throw new Error("Signup data validation failed");
    }

    if (error instanceof Error) {
      console.error("signupService error:", error.message);
      throw new Error(error.message);
    }

    console.error("Unknown signup error:", error);
    throw new Error("Unexpected error while processing signup data");
  }
};

export default signupService;
