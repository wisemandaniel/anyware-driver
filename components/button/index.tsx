import React from "react";

import { Button as RNEButton } from "@rneui/themed";
import { Colors } from "@/constants";
import { StyleSheet } from "react-native";

import { IButtonProps } from "./interface";

const Button = ({
  title,
  buttonStyle,
  containerStyle,
  disabled,
  loading,
  onPress,
  fontSize,
  variant,
  textColor,
  backgroundColor,
  iconColor,
  iconName,
  iconPosition = "left",
  iconSize,
  iconType,
  iconStyle,
  ...rest
}: IButtonProps) => {
  return (
    <RNEButton
      onPress={onPress}
      {...rest}
      title={title}
      containerStyle={[styles.container, containerStyle]}
      icon={{
        name: iconName,
        type: iconType,
        color: Colors[iconColor || "white"],
        size: iconSize,
        iconStyle
      }}
      iconPosition={iconPosition}
      buttonStyle={[
        styles.button,
        buttonStyle,
        variant === "white"
          ? styles.white
          : variant === "whitePrimary"
            ? styles.whitePrimary
            : {
                backgroundColor: Colors[backgroundColor || "primary"],
                borderColor: Colors[textColor || backgroundColor || "primary"],
                borderWidth: disabled || backgroundColor === "transparent" ? 0 : 1
              }
      ]}
      titleStyle={[
        styles.title,
        variant === "white" || variant === "whitePrimary"
          ? styles.whiteText
          : { color: Colors[textColor || "normal"] },
        { fontSize },
        iconName ? styles.iconLeft : undefined
      ]}
      disabled={disabled}
      loading={loading}
    />
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    textAlign: "center",
    height: 48
  },
  container: {
    width: "100%",
    marginBottom: 10
  },
  title: {
    fontFamily: "regular",
    color: Colors.normal,
  },
  white: {
    backgroundColor: Colors.white,
  },
  whitePrimary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10
  },
  whiteText: {
    color: Colors.primary
  },
  iconLeft: {
    marginLeft: 10
  }
});
