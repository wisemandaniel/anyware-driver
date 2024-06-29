import Text from "@/components/text";
import { Colors } from "@/constants";
import { StyleSheet, TextInput, View } from "react-native";
import { byPlatform } from "@/utils";

import { ICustomInputProps } from "./interface";

const CustomInput = ({
  placeholder,
  onChange,
  marginBottom = 0,
  width = "100%",
  style,
  value,
  disabled,
  inputPlaceholder,
  keyboardType,
  error
}: ICustomInputProps) => {
  return (
    <View style={{ marginBottom }}>
      {placeholder ? (
        <Text
          text={placeholder}
          color="primary"
          marginBottom={byPlatform({ ios: 10, android: 5 })}
        />
      ) : undefined}
      <View style={[styles.container, { width }, style]}>
        {!disabled ? (
          <TextInput
            placeholderTextColor={Colors.grey800}
            value={value}
            aria-disabled={disabled}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType={keyboardType}
            placeholder={inputPlaceholder}
            style={inputPlaceholder ? styles.inputStyle : undefined}
          />
        ) : (
          <Text text={value} marginBottom={0} style={styles.text} />
        )}
      </View>
      {error && <Text text={error} color="red" variant="small" />}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    padding: 12.5,
    paddingLeft: 10,
    borderRadius: 10,
  },
  text: {
    marginTop: -3,
  },
  inputStyle: {
    paddingVertical: 0,
    margin: 0,
  },
});
