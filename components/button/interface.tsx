import { IconType } from "@rneui/base";
import { IColor } from "configs";
import { ViewStyle } from "react-native";
export interface IButtonProps {
  title: string;
  buttonStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "white" | "whitePrimary";
  onPress?: (any?: any) => any;
  fontSize?: number;
  textColor?: IColor;
  backgroundColor?: IColor;
  iconName?: string;
  iconType?: IconType;
  iconColor?: IColor;
  iconSize?: number;
  iconPosition?: "bottom" | "left" | "right" | "top";
  iconStyle?: any;
}
