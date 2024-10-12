import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import RestaurantCard from "../cards/restaurant";
import { router } from "expo-router";
import { Restaurant } from "@/functions/restaurant";

interface RestaurantProps {
  restaurants: Restaurant[];
}

const FeaturedRestaurantsComponent: React.FC<RestaurantProps> = ({
  restaurants,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Featured Restaurants</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("hello");
            router.push("/restaurant/allrestaurant");
          }}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {restaurants.map((item, index) => (
          <RestaurantCard
            _id={item._id || ""}
            name={item.name}
            rating={4.4}
            ratingCount={0}
            image={item.image || "https://via.placeholder.com/60"}
            deliveryTime={"12- 19 mins"}
            tags={["hello", "world"]}
            description={""}
            key={item._id}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 16,
    color: "#FF6F00",
  },
});

export default FeaturedRestaurantsComponent;
