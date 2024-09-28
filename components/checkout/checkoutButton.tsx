import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CheckoutButtonComponent = ({onPress}:{onPress: any}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>Confirm Order</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutButtonComponent;
