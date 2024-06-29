import React from "react";

import { StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { IPConfirmationInputProps } from "./interface";

const ConfirmationInput = ({ cellCount, onChange }: IPConfirmationInputProps) => {
  const [value, setValue] = React.useState("");

  const ref = useBlurOnFulfill({ value, cellCount: cellCount });
  const [props] = useClearByFocusCell({
    value,
    setValue,
  });

  React.useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  );
};

export default ConfirmationInput;

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    borderRadius: 5,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#00000030",
    textAlign: "center",
    justifyContent: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
