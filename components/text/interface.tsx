import { IColor } from "constants";
import { StyleProp, TextStyle } from "react-native";

export interface ITextProps {
  text?: string | Element;
  href?: string;
  children?: any;
  color?: IColor;
  bgColor?: IColor;
  width?: number | `${number}%`;
  variant?: "normal" | "title" | "bigTitle" | "small" | "smallest";
  fontWeight?:
    | "regular"
    | "italic"
    | "bold"
    | "semiBold"
    | "light"
    | "lightItalic"
    | "boldItalic"
    | "semiBoldItalic";
  numberOfLines?: number;
  marginBottom?: number;
  paddingLeft?: number;
  marginRight?: number;
  marginLeft?: number;
  paddingRight?: number;
  borderRadius?: number;
  underlined?: boolean;
  capitalize?: boolean;
  row?: boolean;
  center?: boolean;
  onPress?: (any?: any) => any;
  style?: StyleProp<TextStyle>;
  spaceRight?: number;
  spaceLeft?: number;
}
