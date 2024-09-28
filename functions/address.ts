import { appEnv } from '@/configs/env';
import axios from 'axios';

const API_BASE_URL = `${appEnv.backendUrl}/addresses`;

export interface Address {
  _id?: string;
  lat: number;
  lng: number;
  name: string;
  popular_place?: string;
  address_type: 'Home' | 'Office';
  user?: string;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a new address
export const createAddress = async (address: Address, token: string): Promise<Address> => {
  try {
    const response = await axiosInstance.post<Address>('/', address, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};

// Update an existing address by ID
export const updateAddress = async (id: string, address: Partial<Address>, token: string): Promise<Address> => {
  try {
    const response = await axiosInstance.put<Address>(`/${id}`, address, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating address with ID ${id}:`, error);
    throw error;
  }
};

// Delete an address by ID
export const deleteAddress = async (id: string, token: string): Promise<void> => {
  try {
    console.log("deleting...")
    await axiosInstance.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error deleting address with ID ${id}:`, error);
    throw error;
  }
};

// Get an address by ID
export const getAddress = async (id: string, token: string): Promise<Address> => {
  try {
    const response = await axiosInstance.get<Address>(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching address with ID ${id}:`, error);
    throw error;
  }
};

// Get all addresses for the current user
export const getAllAddresses = async (token: string): Promise<Address[]> => {
  try {
    const response = await axiosInstance.get<Address[]>('/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all addresses:', error);
    throw error;
  }
};
