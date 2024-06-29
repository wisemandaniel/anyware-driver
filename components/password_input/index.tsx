import React from "react";

import { Icon } from "@rneui/base";
import Text from "@/components/text";
import { Colors } from "@/constants";
import { StyleSheet, TextInput, View } from "react-native";
import { byPlatform } from "@/utils";

import { IPasswordInputProps } from "./interface";

const PasswordInput = ({
  placeholder,
  onChange,
  marginBottom = 0,
  width = "100%",
  style,
  value,
  disabled,
  inputPlaceholder,
  keyboardType,
  error,
}: IPasswordInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const onShowPassPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  return (
    <View style={{ marginBottom }}>
      {placeholder ? (
        <Text
          text={placeholder}
          color="primary"
          marginBottom={byPlatform({ ios: 10, android: 1 })}
        />
      ) : undefined}
      <View style={[styles.container, { width }, style]}>
        {!disabled ? (
          <>
            <TextInput
              placeholderTextColor={Colors.grey200}
              autoCapitalize="none"
              placeholder={inputPlaceholder}
              keyboardType={keyboardType}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
            />
            <Icon
              name={secureTextEntry ? "eye" : "eye-off"}
              type="feather"
              onPress={onShowPassPress}
            />
          </>
        ) : (
          <Text text={value} marginBottom={0} style={styles.text} />
        )}
      </View>
      {error && <Text text={error} color="red" variant="small" />}
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    padding: 12.5,
    paddingLeft: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginTop: -3,
  },
});
