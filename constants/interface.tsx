import { IconProps } from "@rneui/base";

export interface ISearchParams {
  phoneNumber?: string;
}

export type ILocal = "en" | "fr";

export interface IAppLang {
  lang: string;
  local: ILocal;
}

export interface IData {
  key: string | number;
  label: string | number;
}

export interface IDrawerItemProps {
  name: string;
  label: string;
  icon: IconProps;
  onPress?: (args?: any) => any;
  routeTo?: string;
}

export type IColor =
  | "primary"
  | "secondary"
  | "black"
  | "success"
  | "redLight300"
  | "primaryLighter"
  | "red"
  | "normal"
  | "grey800"
  | "grey200"
  | "transparent"
  | "white"
  | "primaryLight"
  | "borderGrey"
  | "drawerBorder"
  | "border"
  | "backdrop"
  | "timeBg"
  | "lightBlack"
  | "bg"
  | "grey";
