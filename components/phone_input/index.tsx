import React, { useEffect, useRef } from "react";

import { Icon } from "@rneui/themed";
import Text from "@/components/text";
import { Colors } from "@/constants";
import { StyleSheet, View } from "react-native";
import PhoneInput from "react-native-phone-input";
import ReactNativePhoneInput from "react-native-phone-input";
import { byPlatform } from "@/utils";

import { IPhoneProps } from "./interface";

const PhoneNumberInput = React.forwardRef(
  (
    { placeholder, 
      onPress,
      isVerified, 
      marginBottom, 
      value, 
      disabled, 
      error }: IPhoneProps,
    ref
  ) => {
    const phoneNumberRef = useRef<ReactNativePhoneInput>(null);

    useEffect(() => {
      if (value) {
        phoneNumberRef.current?.setValue(value);
      }

      return () => {};
    }, [value]);

    return (
      <View style={[{ marginBottom }]}>
        <Text text={placeholder} color={"primary"} marginBottom={5} />
        <View
          style={[styles.viewStyle, isVerified ? styles.isVerified : undefined]}
        >
          <PhoneInput
            ref={ref ? (ref as any) : phoneNumberRef}
            initialValue="+237"
            initialCountry={"cmr"}
            onChangePhoneNumber={onPress}
            disabled={disabled}
          />
          {isVerified ? (
            <View style={styles.verifiedContainer}>
              <Text
                text={"verified"}
                color="primary"
                variant="small"
                marginBottom={0}
              />
              <Icon
                name="checkmark-circle-outline"
                type="ionicon"
                color={Colors.primary}
                size={20}
                style={styles.iconStyle}
              />
            </View>
          ) : undefined}
        </View>
        {error && <Text text={error} color="red" variant="small" />}
      </View>
    );
  }
);

export default PhoneNumberInput;

const styles = StyleSheet.create({
  viewStyle: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    width: "100%",
    padding: 15,
    paddingLeft: 10,
    borderRadius: 10,
  },
  isVerified: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "25",
  },
  verifiedContainer: {
    position: "absolute",
    right: 10,
    top: "45%",
    justifyContent: "center",
    flexDirection: "row",
  },
  iconStyle: {
    marginLeft: 5,
    marginTop: byPlatform({ ios: -2, android: 0 }),
  },
});
