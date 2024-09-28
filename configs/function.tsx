import { Platform } from "react-native";

export const Log = (...data: any) => {
    console.log(
      "console.log ======> ",
      Platform.select({
        ios: {
          ios: data
        },
        android: {
          android: data
        },
        default: {
          default: data
        }
      })
    );
  };