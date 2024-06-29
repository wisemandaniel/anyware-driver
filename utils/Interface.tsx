// import { ImagePickerAsset, ImagePickerResult } from "expo-image-picker";

export interface IByPlatform {
  ios?: any;
  android?: any;
  data?: any;
}

export interface IImageArgs {
  multiple: boolean;
}

export type IImageResponse =
  | {
      canceled: boolean;
      assets: any;
    }
  | undefined;

export type TTime = {
  key: string;
  label: string;
  time: Date;
};
