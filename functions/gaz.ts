import { appEnv } from "@/configs/env";
import axios from "axios";

const API_BASE_URL = `${appEnv.backendUrl}/gas`;

export interface GasBrand {
  _id: string;
  name: string;
  image?: string;
  prices: { lPrice: string; sPrice: string; mPrice: string };
  available: boolean;
  quantityInStock: number;
  supplierTel?: number;
  status: "Available" | "Not Available";
  createdAt: string;
}

// Get all gas brands
export const getAllGasBrands = async (): Promise<GasBrand[]> => {
  try {
    const response = await axios.get<GasBrand[]>(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all gas brands:", error);
    throw error;
  }
};

// Get all available gas brands
export const getAvailableGasBrands = async (): Promise<GasBrand[]> => {
  try {
    const response = await axios.get<GasBrand[]>(`${API_BASE_URL}/available`);
    return response.data;
  } catch (error) {
    console.error("Error fetching available gas brands:", error);
    throw error;
  }
};
// Get all unavailable gas brands
export const getUnavailableGasBrands = async (): Promise<GasBrand[]> => {
  try {
    const response = await axios.get<GasBrand[]>(`${API_BASE_URL}/unavailable`);
    return response.data;
  } catch (error) {
    console.error("Error fetching unavailable gas brands:", error);
    throw error;
  }
};

// Get a specific gas brand by ID
export const getGasBrandById = async (id: string): Promise<GasBrand> => {
  try {
    const response = await axios.get<GasBrand>(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching gas brand with ID ${id}:`, error);
    throw error;
  }
};
