import { ITextProps } from "@/components/text/interface";
import { IData } from "@/constants";
import { ViewStyle } from "react-native";

export interface IModalSelectorProps {
  placeholder?: string;
  error?: string;
  cancelText?: string;
  marginBottom?: number;
  width?: number | `${number}%`;
  onPress?: (data?: IData) => any;
  data: IData[] & any[];
  style?: ViewStyle;
  value?: string;
  disabled?: boolean;
  multiselect?: boolean;
  noBorders?: boolean;
  onPressMultiSelect?: (data?: IData[]) => any;
  placeholderOptions?: ITextProps;
  titleOptions?: ITextProps;
  selectedData?: IData[];
}
