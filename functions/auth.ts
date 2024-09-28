import { appEnv } from "@/configs/env";
import axios from "axios";
import Toast from "react-native-toast-message";

const API_BASE_URL = `${appEnv.backendUrl}/auth`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define the types for the user data
export interface SignupData {
  phoneNumber: string;
  password: string;
  referrerCode?: string
}

export interface LoginData {
  phoneNumber: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    phoneNumber: string;
    name: string;
    email: string;
    address: string;
    image: string;
    role: string;
  };
  token: string;
  message?: string;
}

export interface VerifyOtpData {
  phoneNumber: string;
  otp: string;
}

// API call for signing up
export const signup = async (userData: SignupData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/register", userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message,
      });
    } else {
      console.error("Signup error", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }
    throw error;
  }
};

// API call for logging in
export const login = async (credentials: LoginData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/login", credentials);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message,
      });
    } else {
      console.error("Login error", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }
    throw error;
  }
};

// API call for otp verification
export const verifyOtp = async (data: VerifyOtpData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/verify-otp", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: `${error.response.data.message}! You can't login`,
      });
    } else {
      console.error("Verify OTP error", error);
    }
    throw error;
  }
};
