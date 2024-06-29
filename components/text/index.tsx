import React from "react";

import { Colors, appInfo } from "@/constants";
import * as Linking from "expo-linking";
import { Text as AppText, StyleSheet } from "react-native";

import { ITextProps } from "./interface";

const Text = ({
  text,
  style,
  variant,
  color,
  href,
  center,
  underlined,
  onPress,
  row,
  marginBottom,
  numberOfLines,
  fontWeight = "regular",
  children,
  marginRight,
  paddingLeft,
  paddingRight,
  width,
  capitalize,
  bgColor,
  borderRadius,
  marginLeft,
  spaceRight,
  spaceLeft
}: ITextProps) => {
  const variantStyle =
    variant === "title"
      ? styles.title
      : variant === "small"
        ? styles.smallTitle
        : variant === "bigTitle"
          ? styles.bigTitle
          : variant === "smallest"
            ? styles.smallestTitle
            : styles.normal;

  const colorStyle = {
    color: Colors[color || "grey800"]
  };

  const fontWeightStyle = { fontFamily: fontWeight };

  const onClickHref = () => Linking.openURL(href || appInfo.website);

  return (
    <AppText
      style={[
        fontWeightStyle,
        variantStyle,
        colorStyle,
        center ? styles.center : undefined,
        capitalize ? styles.capitalize : undefined,
        underlined ? styles.underlined : undefined,
        row ? styles.row : undefined,
        {
          width,
          backgroundColor: bgColor ? Colors[bgColor] : undefined,
          borderRadius,
          overflow: borderRadius ? "hidden" : undefined
        },
        { paddingRight, paddingLeft, marginRight, marginLeft, marginBottom },
        style
      ]}
      numberOfLines={numberOfLines}
      onPress={!onPress && !href ? undefined : href ? onClickHref : () => onPress?.(text)}
    >
      {spaceLeft
        ? Array(spaceLeft)
          .fill(spaceLeft)
          .map((_space, index) => <AppText key={index}> </AppText>)
        : undefined}
      {children || text}
      {spaceRight
        ? Array(spaceRight)
          .fill(spaceRight)
          .map((_space, index) => <AppText key={index}> </AppText>)
        : undefined}
    </AppText>
  );
};

export default Text;

const styles = StyleSheet.create({
  normal: {
    fontSize: 16
  },
  title: {
    fontSize: 20
  },
  bigTitle: {
    fontSize: 25
  },
  smallTitle: {
    fontSize: 14
  },
  smallestTitle: {
    fontSize: 14
  },
  center: {
    textAlign: "center"
  },
  underlined: {
    textDecorationLine: "underline"
  },
  capitalize: {
    textTransform: "capitalize"
  },
  row: {
    flexDirection: "row"
  }
});
