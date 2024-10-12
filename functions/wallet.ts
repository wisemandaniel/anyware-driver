import { appEnv } from "@/configs/env";
import axios from "axios";
import { PaymentData } from "./payments";

const API_BASE_URL = `${appEnv.backendUrl}/wallet`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface WalletResponse {
    details: any;
    id: string
    user_id: string
    main_balance: number
    referral_balance: number
    status: string
    min_withdraw_main: number
    min_withdraw_referral: number
    created_at: string
    updated_at: string
    message: string
}

export interface WalletPaymentResponse {
  amount: number,
  orderId: string
}


// API call for getting user wallet up
export const getUserWallet = async (token: string): Promise<WalletResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user's wallet", error);
    throw error;
  }
};

export const topUpAccount = async (
  wallet: WalletResponse,
  token: string,
  id: string
): Promise<WalletResponse> => {
  try {
    const response = await axios.post<WalletResponse>(`${API_BASE_URL}/${id}/topup`, wallet, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      console.error("Error topping up account:", error);
    }
    throw error;
  }
};


export const withdrawFromMainBalance = async (
  wallet: WalletResponse,
  token: string,
  id: string
): Promise<WalletResponse> => {
  try {
    const response = await axios.post<WalletResponse>(`${API_BASE_URL}/${id}/withdrawMain`, wallet, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      console.error("Error withdrawing from main balance:", error);
    }
    throw error;
  }
};


export const makepaymentWithWallet = async (
  paymentData: WalletPaymentResponse,
  token: string,
  id: string
) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}/pay`, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error paying from wallet:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response ? error.response.data.error : "Payment creation failed"
    );
  }
};