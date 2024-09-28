import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { verifyOtp } from "@/functions/auth";
import { setToken, setUser } from "@/store/system_persist";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
const CELL_COUNT = 4;

const Page = () => {
  const { phone } = useLocalSearchParams<{
    phone: string;
  }>();
  const [code, setCode] = useState("");

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (code.length === 4) {
      verifyCode(code);
    }
  }, [code]);

  const verifyCode = async (code: string) => {
    try {
      const response = await verifyOtp({
        otp: code,
        phoneNumber: phone as string,
      });

      console.log(response);
      Toast.show({ type: "success", text1: response.message });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return response;
    } catch (error: any) {
      console.log("opt failed", error);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>4-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to{" "}
        <Text style={{ fontWeight: "800", letterSpacing: 1, fontSize: 22 }}>
          {phone}
        </Text>{" "}
        unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 1 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />

      <Link href={"/login"} replace asChild>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink]}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: "#000",
    fontSize: 42,
    fontWeight: "600",
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 4,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
});
export default Page;
