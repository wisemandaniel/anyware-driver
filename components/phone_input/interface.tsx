import { TextStyle, ViewStyle } from "react-native";
export interface IPhoneProps {
  placeholder?: string;
  error?: string;
  style?: ViewStyle;
  isVerified?: boolean;
  onPress?: (value?: string) => any;
  marginBottom?: number;
  value?: string;
  disabled?: boolean;
  placeholderStyle?: TextStyle
}
