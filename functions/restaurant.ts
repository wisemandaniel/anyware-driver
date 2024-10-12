import { appEnv } from "@/configs/env";
import axios from "axios";

const API_BASE_URL = `${appEnv.backendUrl}/restaurants`;

export interface Restaurant {
  _id?: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  phoneNumber: string;
  email: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all restaurants
export const getAllRestaurants = async (
  token: string
): Promise<Restaurant[]> => {
  try {
    const response = await axiosInstance.get<Restaurant[]>("/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all restaurants:", error);
    throw error;
  }
};

// Get a specific restaurant by ID
export const getRestaurantById = async (
  id: string,
  token: string
): Promise<Restaurant> => {
  try {
    const response = await axiosInstance.get<Restaurant>(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching restaurant with ID ${id}:`, error);
    throw error;
  }
};

// Create a new restaurant
export const createRestaurant = async (
  restaurant: Restaurant,
  token: string
): Promise<Restaurant> => {
  try {
    const response = await axiosInstance.post<Restaurant>("/", restaurant, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
};

// Update an existing restaurant by ID
export const updateRestaurant = async (
  id: string,
  restaurant: Partial<Restaurant>,
  token: string
): Promise<Restaurant> => {
  try {
    const response = await axiosInstance.put<Restaurant>(`/${id}`, restaurant, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating restaurant with ID ${id}:`, error);
    throw error;
  }
};

// Delete a restaurant by ID
export const deleteRestaurant = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    await axiosInstance.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error deleting restaurant with ID ${id}:`, error);
    throw error;
  }
};
