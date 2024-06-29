import { ITextProps } from "components/text/interface";
import { ViewStyle } from "react-native";
export interface IDateTimeInputProps {
  placeholder?: string;
  mode?: "date" | "time" | "datetime";
  onPress?: (date?: Date) => any;
  style?: ViewStyle;
  dateTimeContainerStyle?: ViewStyle;
  placeholderTextOptions?: ITextProps;
  timeTextOptions?: ITextProps;
  value?: Date;
  marginBottom?: number;
}
