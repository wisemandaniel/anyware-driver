import { appEnv } from "@/configs/env";
import axios from "axios";
import Toast from "react-native-toast-message";

const API_BASE_URL = `${appEnv.backendUrl}/settings`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Settings {
  whatsappSupport: string;
  whatsappGroup: string;
  telegramGroup: string;
  telegramSupport: string;
  supportNumbers: string[];
  faqs: any;
}

// API call for getting global varriablea
export const getGlobalVarriables = async (token: string): Promise<Settings> => {
    try {
        const response = await axios.get<Settings>(`${API_BASE_URL}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
};
