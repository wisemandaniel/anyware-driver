import { appEnv } from "@/configs/env";
import axios from "axios";

const API_BASE_URL = `${appEnv.backendUrl}/menus`;

export interface Menu {
  _id?: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  type?: string;
  size?: string;
  createdAt?: string;
  updatedAt?: string;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a new menu item
export const createMenuItem = async (menu: Menu, token: string): Promise<Menu> => {
  try {
    const response = await axiosInstance.post<Menu>('/', menu, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating menu item:', error);
    throw error;
  }
};

// Get all menus
export const getAllMenus = async (token: string): Promise<Menu[]> => {
  try {
    const response = await axiosInstance.get<Menu[]>('/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all menus:', error);
    throw error;
  }
};

// Get a specific menu by ID
export const getMenuById = async (id: string, token: string): Promise<Menu> => {
  try {
    const response = await axiosInstance.get<Menu>(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu with ID ${id}:`, error);
    throw error;
  }
};

// Get all menus for a specific restaurant
export const getMenuByRestaurantId = async (restaurantId: string, token: string): Promise<Menu[]> => {
  try {
    const response = await axiosInstance.get<Menu[]>(`/restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching menus for restaurant ID ${restaurantId}:`, error);
    throw error;
  }
};

// Update a menu by ID
export const updateMenu = async (id: string, menu: Partial<Menu>, token: string): Promise<Menu> => {
  try {
    const response = await axiosInstance.put<Menu>(`/${id}`, menu, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating menu with ID ${id}:`, error);
    throw error;
  }
};

// Delete a menu by ID
export const deleteMenu = async (id: string, token: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error deleting menu with ID ${id}:`, error);
    throw error;
  }
};
