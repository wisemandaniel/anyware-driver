import { appEnv } from "@/configs/env";
import axios from "axios";

const API_BASE_URL = `${appEnv.backendUrl}/payments`;

export interface PaymentData {
  orderId: string;
  amount: number;
  from: string;
  currency: string;
  transactionId?: string;
  status?: string;
}

export const createPayment = async (
  paymentData: PaymentData,
  token: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating payment:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response ? error.response.data.error : "Payment creation failed"
    );
  }
};

export const handleCampayWebhook = async (webhookData: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/campay-webhook`, {
      params: webhookData,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error processing Campay webhook:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response ? error.response.data.error : "Webhook processing failed"
    );
  }
};
