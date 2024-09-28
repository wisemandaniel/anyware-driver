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
import { useDispatch } from "react-redux";
import { setCurrentRestaurant } from "@/store/system_persist";

interface RestaurantCardProps {
  _id: string;
  name: string;
  rating: number;
  ratingCount: number;
  image: string;
  deliveryTime: string;
  tags: string[];
  isFavorite?: boolean;
  freeDelivery?: boolean;
  description: string;
  width?: string | number;
  onFavoriteToggle?: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  _id,
  name,
  rating,
  ratingCount,
  image,
  deliveryTime,
  tags,
  isFavorite = false,
  freeDelivery = true,
  description,
  width = "48%",
}) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => {
      dispatch(
        setCurrentRestaurant({
          _id,
          name,
          rating,
          ratingCount,
          image,
          deliveryTime,
          tags,
          isFavorite: false,
          freeDelivery: true,
          description,
          width: 266,
        })
      );
      router.push("/restaurant/menu");
    }} style={[styles.card, { width: width as DimensionValue }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {
            console.log("fav pressed");
          }}
        >
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={18}
            color={"#FF6F00"}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View
          style={styles.header}
        >
          <Text style={styles.name}>{name}</Text>
          <Feather name="check-circle" size={16} color="#00C48C" />
        </View>
        <View style={styles.ratingContainer}>
          <Feather name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({ratingCount}+)</Text>
        </View>
        <View style={styles.deliveryContainer}>
          <View style={styles.deliveryInfo}>
            <Feather name="clock" size={14} color="#FF6F00" />
            <Text style={styles.deliveryText}>{deliveryTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "100%",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
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
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
    color: "#666",
  },
});

export default RestaurantCard;
