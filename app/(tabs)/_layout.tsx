import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useSegments } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";
import { Text } from "@/components";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";

const tabs = [
  {
    name: "index",
    icon: <Feather name="home" size={25} color={Colors.grey200}/>,
    iconActive: <Feather name="home" size={25} color={"#E91E63"}/>,
  },
  {
    name: "history",
    icon: <Octicons name="history" size={25} color={Colors.grey200}/>,
    iconActive: <Octicons name="history" size={25} color={"#E91E63"}/>,
  },
  {
    name: "profile",
    icon: <Ionicons name="person" size={25} color={Colors.grey200}/>,
    iconActive: <Ionicons name="person" size={25} color={"#E91E63"}/>,
  },
];

export default function TabLayout() {
  const pathName = useSegments();
  console.log(pathName);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          height: 85,
          paddingHorizontal: 10,
          borderRadius: 19,
          shadowColor: "#E91E63",
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 133,
          elevation: 4,
          justifyContent: "space-between",
          alignItems: "center",
        },
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName="index"
    >
      {tabs.map((tab, index) => (
        <Tabs.Screen
          name={tab.name}
          options={{
            // href: tab.name,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <View style={styles.active}>
                  <View style={[styles.button]}>
                    {tab.iconActive}
                  </View>
                  <Text
                    text={
                      tab.name === "index"
                        ? "Home"
                        : tab.name.charAt(0).toUpperCase() + tab.name.slice(1)
                    }
                    color="#E91E63"
                    marginLeft={4}
                  />
                </View>
              ) : (
                <View style={styles.button}>{tab.icon}</View>
              ),
          }}
          key={index}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  active: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    height: 39,
    width: "100%",
    borderRadius: 31,
    backgroundColor: "#E91E6330",
  },
});
