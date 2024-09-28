import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");


export const appDimension = {
    width,
    height,
    minHeight: 667
  };
  
  export const CONSTANTS = {
    APP_NAME: "anyware",
    MIN_MODAL_HEIGHT: 234
  };