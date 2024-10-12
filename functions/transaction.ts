import { appEnv } from "@/configs/env";
import axios from "axios";

const API_BASE_URL = `${appEnv.backendUrl}/transactions`;

export interface Transaction {
  _id?: string;
  order?: string;
  user?: string;
  amount: number;
  currency: string;
  from?: string;
  status: "PENDING" | "SUCCESSFUL" | "FAILED";
  transactionId?: string;
  type: "TOP UP" | "WITHDRAWAL" | "PAYMENT" | "REFERRAL";
  createdAt?: string;
  updatedAt?: string;
}

// Fetch all transactions
export const getTransactions = async (
  token: string
): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching transactions:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response
        ? error.response.data.error
        : "Failed to fetch transactions"
    );
  }
};

// Fetch transactions for the logged-in user
export const getUserTransactions = async (
  token: string
): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching user transactions:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response
        ? error.response.data.error
        : "Failed to fetch user transactions"
    );
  }
};

// Fetch a specific transaction by ID
export const getTransactionById = async (
  id: string,
  token: string
): Promise<Transaction> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching transaction with ID ${id}:`,
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response ? error.response.data.error : "Failed to fetch transaction"
    );
  }
};

// Delete a transaction by ID
export const deleteTransaction = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    console.error(
      `Error deleting transaction with ID ${id}:`,
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response
        ? error.response.data.error
        : "Failed to delete transaction"
    );
  }
};
