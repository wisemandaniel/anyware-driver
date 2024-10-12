import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import React from "react";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 10,
          marginTop: -10,
        },
        tabBarStyle: {
          backgroundColor: Colors.white,
          height: 75,
          borderRadius: 19,
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
      tabBar={(props) => (
        <View
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            borderRadius: 19,
            backgroundColor: Colors.background
          }}
        >
          <BottomTabBar {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="active"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="fast-food-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user-o" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default Layout;
