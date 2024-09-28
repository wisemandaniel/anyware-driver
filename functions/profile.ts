import { appEnv } from "@/configs/env";
import axios from "axios";

const API_BASE_URL = `${appEnv.backendUrl}/profile`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ProfileResponse {
  _id: string;
  phoneNumber: string;
  name?: string;  // `name` is not present in your response, so it should be optional
  email?: string; // `email` is not present in your response, so it should be optional
  address?: string; // `address` is not present in your response, so it should be optional
  image?: string; // `image` is not present in your response, so it should be optional
  role: string;
  referralCode: string;
  referrals: any[]; // Adjust the type if you know what it should be
  referrer?: string;
  suspended: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  password?: string;
}


// API call for signing up
export const getUserProfile = async (token: string): Promise<ProfileResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

export const deleteAccount = async (token: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}`, {
       headers: { Authorization: `Bearer ${token}`},
    });
    return response.data
  } catch (error) {
    throw error
  }
}

export const updatedProfile = async (
    user: any,
    token: string
  ) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}`,
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating user:`, error);
      throw error;
    }
}

export const updateProfilePhoto = async (
  file: FormData,
  token: string
) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/profile-picture`,
      file,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating profile Photo:`, error);
    throw error;
  }
}