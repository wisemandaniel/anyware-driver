import * as ExpoImagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";

import { IImageArgs, IImageResponse } from "./Interface";

export const pickImageFromCamera = async ({
  multiple = false
}: IImageArgs): Promise<IImageResponse> => {
  const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    Toast.show("Permission denied, Please go to myakawo permission and enable it", {
      duration: Toast.durations.LONG
    });
    return;
  }

  const result = await ExpoImagePicker.launchCameraAsync({
    mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: multiple
  });

  return result;
};

export const pickImageFromGallery = async ({
  multiple = false
}: IImageArgs): Promise<IImageResponse> => {
  const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Toast.show("Permission denied, Please go to myakawo permission and enable it", {
      duration: Toast.durations.LONG
    });
    return;
  }

  const result = await ExpoImagePicker.launchImageLibraryAsync({
    mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: multiple
  });

  return result;
};
