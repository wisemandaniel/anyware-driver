import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={20} color={"#ff4081"} />
      </TouchableOpacity>
      <Text style={styles.title}>Order Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff4081",
    borderRadius: 50,
    padding: 5,
    justifyContent: "center",
  },
  backText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  callButton: {
    padding: 10,
  },
  callIcon: {
    width: 24,
    height: 24,
  },
});

export default Header;
