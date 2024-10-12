import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { IAppState } from "@/store/interface";

const HeaderComponent: React.FC = () => {
  const cartItems = useSelector((state: IAppState) => state.systemPersist.card);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={() => router.back()}>
        <Feather name="home" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.shoppingCart}
        onPress={() => {
          router.push("/general/card");
        }}
      >
        <Feather name="shopping-cart" size={20} />
        <View style={styles.cartIcon}>
          <Text style={{ color: "#FFF" }}>{cartItems.length}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  menuButton: {
    padding: 10,
  },
  deliveryInfo: {
    flex: 1,
    marginLeft: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: "#888",
  },
  deliveryAddress: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6F00",
  },
  shoppingCart: {
    marginRight: 15,
    marginTop: 10,
    position: "relative",
  },
  cartIcon: {
    position: "absolute",
    backgroundColor: "#FF6F00",
    height: 15,
    width: 20,
    borderRadius: 7.5,
    paddingHorizontal: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    top: -5,
    right: -10,
  },
});

export default HeaderComponent;
