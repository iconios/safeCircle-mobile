/*
#Plan:
1. Receive and validate the user data
2. Pass the user data to the backend server
3. Return the server response to the client
*/

import {
  signUpAuthServerResponseType,
  signupServiceInputSchema,
  signupServiceInputType,
} from "../types/signup.types";
import validateApiUrl from "../../../services/validateApiUrl.service";
import { authServicesCaughtErrors } from "../helpers/serviceCaughtErrors";

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

    // 3. Return the server response to the client
    const result: signUpAuthServerResponseType = await response.json();
    console.log("Signup data", result);

    if (!result.success) {
      throw new Error(result.message || "Signup request failed");
    }

    return result.message;
  } catch (error) {
    authServicesCaughtErrors(error, "signupService", "signup");
  }
};

export default signupService;
