import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { login } from "@/functions/auth";
import { setToken, setUser } from "@/store/system_persist";
import { useRouter } from "expo-router";
import React from "react";
import { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

enum SignInType {
  Phone,
  Google,
}

const Page = () => {
  const [countryCode, setCountryCode] = useState("+237");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const dispatch = useDispatch();

  const onSignIn = async (type: SignInType) => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    setIsLoading(true);
    try {
      const response = await login({
        password: "anyware1234",
        phoneNumber: fullPhoneNumber,
      });

      console.log({ response });

      dispatch(setUser(response.user));
      dispatch(setToken(response.token));
      
      Toast.show({
        type: "success",
        text1: "Successful",
        text1Style: {
          fontSize: 18,
          fontWeight: "bold",
          color: Colors.background,
        },
        text2: "You successfully log into your account",
      });
      setIsLoading(false);
      router.push("/(authenticated)/(tabs)/active");
      return response;
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.code}>
            <Image
              source={require("@/assets/images/cameroon.jpeg")}
              style={styles.flag}
            />
            <Text style={styles.c_Code}>{countryCode}</Text>
          </View>
          <TextInput
            maxLength={9}
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber.length >= 9 ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          disabled={!phoneNumber || phoneNumber.length < 9}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          {!isLoading && <Text style={defaultStyles.buttonText}>Continue</Text>}
          {isLoading && <ActivityIndicator color={"white"} size={32} />}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 24,
    marginRight: 10,
  },
  code: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 8,
  },
  c_Code: {
    fontSize: 20,
    fontWeight: "600",
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
export default Page;
