import { KeyboardTypeOptions, ViewStyle } from "react-native";
export interface IPasswordInputProps {
  placeholder?: string;
  error?: string;
  style?: ViewStyle;
  marginBottom?: number;
  width?: number | `${number}%`;
  onChange?: (value?: string) => any;
  value?: string;
  disabled?: boolean;
  inputPlaceholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
}
