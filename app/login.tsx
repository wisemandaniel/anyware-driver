import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { login } from "@/functions/auth";
import { setToken, setUser } from "@/store/system_persist";
import { useRouter } from "expo-router";
import React from "react";
import { useState, useEffect, useRef} from "react";
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
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

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

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const onSignIn = async (type: SignInType) => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    setIsLoading(true);
    try {
      const response = await login({
        password: "anyware1234",
        phoneNumber: fullPhoneNumber,
        fcmToken: expoPushToken
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
