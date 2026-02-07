/*
#Plan:
1. Receive and validate the user data
2. Pass the user data to the backend server
3. Return the server response to the client
*/

import validateApiUrl from "../../../services/validateApiUrl.service";
import store from "../../../store";
import { authServicesCaughtErrors } from "../helpers/serviceCaughtErrors";
import { authActions } from "../store/authSlice";
import {
  verifyOtpServiceInputSchema,
  verifyOtpServiceInputType,
  verifyOtpServiceResponseType,
} from "../types/verifyOtp.types";

const verifyOtpService = async (verifyOtpData: verifyOtpServiceInputType) => {
  const API_URL = validateApiUrl();
  console.log("API URL:", API_URL);

  try {
    // 1. Receive and validate the user data
    const validatedInput = verifyOtpServiceInputSchema.parse(verifyOtpData);

    // 2. Pass the user data to the backend server
    const response = await fetch(`${API_URL}/api/v1/auth/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedInput),
    });

    // 3. Return the server response to the client
    const result: verifyOtpServiceResponseType = await response.json();
    console.log("Verify otp server response", result);

    if (!result.success) {
      throw new Error(result.message || "Verify otp request failed");
    }

    store.dispatch(authActions.loggedIn(result.data));
    return result.data;
  } catch (error) {
    authServicesCaughtErrors(error, "verifyOtpService", "verify otp");
  }
};

export default verifyOtpService;
