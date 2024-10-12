import { appEnv } from "@/configs/env";
import axios from "axios";

const API_BASE_URL = `${appEnv.backendUrl}/orders`;
const API_DRIVER = `${appEnv.backendUrl}/driver-location`;

export interface Location {
  driverId: string, latitude: number, longitude: number
}

export interface Order {
  food: {};
  order(order: any): unknown;
  orderNumber: string;
  _id?: string;
  customer: string; // user ID
  service: string; // service ID
  address?: {}; // address ID
  gas_brand?: string;
  qty?: number;
  bottle_size?: string;
  delivery_fee?: number;
  currency?: string;
  restaurant?: string; // restaurant ID
  pressing?: string; // pressing ID
  amount_paid?: number;
  total_amount?: number;
  amount_payment_status?: "PENDING" | "COMPLETED";
  delivery_payment_status?: "PENDING" | "COMPLETED";
  status?: "PENDING" | "REJECTED" | "DELIVERED" | "CANCELLED" | "ACCEPTED";
  driver?: string; // driver ID
  createdAt?: string;
  updatedAt?: string;
  paymentType: string;
}

// Create a new order
export const createOrder = async (
  order: Order,
  token: string
): Promise<Order> => {
  try {
    const response = await axios.post<Order>(`${API_BASE_URL}/create`, order, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      console.error("Error creating order:", error);
    }
    throw error;
  }
};

// Update an existing order by ID
export const updateOrder = async (
  id: string,
  order: Partial<Order>,
  token: string
): Promise<Order> => {
  try {
    const response = await axios.put<Order>(
      `${API_BASE_URL}/update/${id}`,
      order,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating order with ID ${id}:`, error);
    throw error;
  }
};

// Delete an order by ID
export const deleteOrder = async (id: string, token: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error deleting order with ID ${id}:`, error);
    throw error;
  }
};

// Get all orders assigned to a driver
export const getAllOrders = async (token: string): Promise<Order[]> => {
  try {
    const response = await axios.get<Order[]>(`${API_BASE_URL}/getAssignedOrders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

// Get an order by ID
export const getOrderById = async (
  id: string,
  token: string
): Promise<Order> => {
  try {
    const response = await axios.get<Order>(`${API_BASE_URL}/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error;
  }
};

// Cancel an order by ID
export const cancelOrder = async (
  id: string,
  token: string
): Promise<Order> => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/cancel/${id}`,
      {}, // Empty object if no data needs to be sent
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error canceling order with ID ${id}:`, error);
    throw error;
  }
};


// Superadmin: Get all orders (admin-specific)
export const getAllOrdersForSuperAdmin = async (): Promise<Order[]> => {
  try {
    const response = await axios.get<Order[]>(`${API_BASE_URL}/getAllOrders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders for superadmin:", error);
    throw error;
  }
};

// Driver: Get assigned accepted orders
export const getAssignedOrders = async (token: string): Promise<Order[]> => {
  try {
    const response = await axios.get<Order[]>(
      `${API_BASE_URL}/getAssignedAcceptedOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching assigned accpeted orders:", error);
    throw error;
  }
};

export const sendLocationOfDriver = async (token: any, location: Location) => {
  try {
    const response = await axios.post<Order>(`${API_DRIVER}`, location, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      console.error("Error updating location:", error);
    }
    throw error;
  }
}