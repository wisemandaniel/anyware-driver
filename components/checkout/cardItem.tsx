import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface CartItemComponentProps {
  imageUri: string;
  name: string;
  description: string;
  price: string;
  type: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({
  imageUri,
  name,
  description,
  price,
  quantity,
  type,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <View
      style={[
        styles.container,
        type == "GAZ" ? { borderColor: Colors.primary, borderLeftWidth: 4 } : {},
      ]}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={onDecrease} style={styles.controlButton}>
          <Feather name="minus" size={16} color="#FF6F00" />
        </TouchableOpacity>
        <Text style={styles.quantity}>
          {quantity < 10 ? `0${quantity}` : quantity}
        </Text>
        <TouchableOpacity onPress={onIncrease} style={styles.controlButton}>
          <Feather name="plus" size={16} color="#FF6F00" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Feather name="x" size={24} color="#FF6F00" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6F00",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    padding: 10,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  removeButton: {
    padding: 10,
  },
});

export default CartItemComponent;
