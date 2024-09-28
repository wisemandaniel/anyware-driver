import Colors from "@/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { useFonts } from "expo-font";
import * as Font from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";

import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import Constants from "expo-constants";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Log } from "@/configs/function";
import Loader from "@/components/loader";
import { IAppState } from "@/store/interface";

const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        borderLeftWidth: 7,
        width: "90%",
        height: 70,
        borderRightColor: "green",
        borderRightWidth: 7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),

  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor: "red",
        borderLeftWidth: 7,
        width: "95%",
        height: 90,
        borderRightColor: "red",
        borderRightWidth: 7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = ({ setLoading }: { setLoading: any }) => {
  const [loaded, setLoaded] = useState(false);
  const [fontError, setFontError] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: IAppState) => state.systemPersist.token);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        // await Font.loadAsync({
        //   ...RanadeFonts,
        //   ...FontAwesome.font,
        // });
        setLoaded(true);
        SplashScreen.hideAsync();
        setLoading(false);
      } catch (error: any) {
        console.error("Font loading error:", error);
        setFontError(error);
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (loaded && !fontError) {
      const checkAuth = async () => {
        console.log(token);
        try {
          if (token) {
            router.replace("/(authenticated)/(tabs)/active");
          } else {
            router.push("/");
          }
        } catch (error) {
          console.error("Error validating token:", error);
        }
      };

      checkAuth();
    }
  }, [loaded, fontError]);

  if (!loaded && !fontError) {
    return <Loader />;
  }

  if (fontError) {
    return (
      <View>
        <Text>Error loading fonts. Please try again.</Text>
      </View>
    );
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(authenticated)/restaurant/restaurant"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(authenticated)/gas/gas_brand"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(authenticated)/restaurant/menu"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(authenticated)/restaurant/meal"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/card"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(authenticated)/restaurant/allrestaurant"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(authenticated)/restaurant/category"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(authenticated)/restaurant/search"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/delivery_address"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/add_address"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/checkout"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/tracking"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/addresses"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/account"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/support"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/faqs"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/wallet"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/update_address"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/general/scan_qrcode"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(authenticated)/general/order-details/[id]"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setIsLoading] = useState(false);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.

  useEffect(() => {
    const unsubscribeNetInfoListener = NetInfo.addEventListener((state) => {
      Log(`Connection type: ${state.type}`);
      setIsConnected(!!state.isConnected);
    });

    return () => {
      unsubscribeNetInfoListener();
    };
  }, [loading]);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadCartFromStorage());
  // }, [dispatch]);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar style="dark" />
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.screen}
              contentContainerStyle={styles.screen}
            >
              <BottomSheetModalProvider>
                {!isConnected ? (
                  <View style={styles.error}>
                    <Text>
                      You appear to be offline. please check your internet
                      connection
                    </Text>
                  </View>
                ) : undefined}
                <InitialLayout setLoading={setIsLoading} />
                <Toast config={toastConfig} />
              </BottomSheetModalProvider>
            </KeyboardAvoidingView>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default RootLayoutNav;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.transparent,
  },
  error: {
    backgroundColor: Colors.red,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  success: {
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  screen: {
    flex: 1,
  },
});
