import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  DimensionValue,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Menu } from "@/functions/menu";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMeal, addItem, removeItem } from "@/store/system_persist";
import { IAppState } from "@/store/interface";

interface FoodItemCardProps {
  menuItems: Menu;
  rating: number;
  ratingCount: number;
  isFavorite: boolean;
  width?: string | number;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({
  menuItems,
  rating,
  ratingCount,
  isFavorite,
  width = "48%",
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: IAppState) => state.systemPersist.card);

  // Check if the item is already in the cart
  const isInCart = cartItems.some((item) => item.id === menuItems._id);

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeItem({ id: menuItems._id }));
    } else {
      dispatch(
        addItem({
          id: menuItems._id,
          name: menuItems.name,
          image: menuItems.image,
          price: menuItems.price,
          quantity: 1,
          type: "FOOD",
        })
      );
    }
  };

  const onFavoriteToggle = () => {
    console.log("favorite clicked");
  };

  return (
    <View style={[styles.card, { width: width as DimensionValue }]}>
      <Image source={{ uri: menuItems.image }} style={styles.image} />
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>{menuItems.price} XAF</Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onFavoriteToggle}
      >
        <FontAwesome
          name={isFavorite ? "heart" : "heart-o"}
          size={18}
          color={"#FF6F00"}
        />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <View style={styles.ratingContainer}>
          <Feather name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({ratingCount}+)</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(setCurrentMeal(menuItems));
            router.push("/restaurant/meal");
          }}
        >
          <Text style={styles.name}>{menuItems.name}</Text>
        </TouchableOpacity>
        <Text style={styles.description} numberOfLines={1}>
          {menuItems.description}
        </Text>

        <TouchableOpacity
          style={[
            styles.cartButton,
            isInCart ? styles.removeButton : styles.addButton,
          ]}
          onPress={handleAddToCart}
        >
          <Text style={styles.cartButtonText}>
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#FF6F0070",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },
  priceTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    padding: 5,
  },
  priceText: {
    color: "#FF6F00",
    fontWeight: "bold",
    fontSize: 16,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 25,
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  ratingIcon: {
    fontSize: 16,
    color: "#FFD700",
  },
  rating: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  cartButton: {
    marginTop: 10,
    borderRadius: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  addButton: {
    backgroundColor: "#FF6F00",
  },
  removeButton: {
    backgroundColor: "#FF3D00",
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FoodItemCard;
