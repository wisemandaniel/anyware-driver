import React from "react";

import { Button, Text } from "@/components";

import { Colors, appDimension, appLanguage, AppLang } from "@/constants";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { StaticImage } from "@/assets";
import { StatusBar } from "expo-status-bar";

const WelcomeScreen = () => {
  const router = useRouter();

  const goToNext = () => {
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Image
        source={StaticImage.welcomeImg}
        style={{ height: appDimension.height * 0.4 }}
      />
      <View style={styles.welcomeView}>
        <Text
          text={"Earn on Your Schedule. Deliver Happiness."}
          variant="bigTitle"
          fontWeight="bold"
          marginBottom={appDimension.height * 0.03}
          center
        />
        <Text
          text={
            "Be your own boss, set your own hours, and deliver smiles with every drop-off."
          }
          fontWeight="light"
          variant="title"
          center
          color={Colors.grey200}
          width="70%"
          style={{ lineHeight: 30 }}
        />
        <Button
          title="Get Started"
          containerStyle={{
            borderRadius: 2000,
            width: appDimension.width * 0.5,
            marginHorizontal: "auto",
            marginTop: appDimension.height * 0.05,
          }}
          onPress={goToNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    height: appDimension.height,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bg,
    paddingVertical: appDimension.height * 0.05,
    gap: 60,
  },

  welcomeView: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    flex: 0.8,
    width: appDimension.width * 0.9,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
