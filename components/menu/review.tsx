import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import Review from "../cards/review";

interface ReviewProps {
  username: string;
  rating: number;
  comment: string;
  profileImageUri: string;
}

interface ReviewsAndRatingsComponentProps {
  reviews: ReviewProps[];
}

const ReviewsAndRatingsComponent: React.FC<ReviewsAndRatingsComponentProps> = ({
  reviews,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews and Ratings</Text>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <Review {...item} />}
        keyExtractor={(item) => item.username}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  review: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
    color: "#333",
  },
  comment: {
    fontSize: 14,
    color: "#666",
  },
});

export default ReviewsAndRatingsComponent;
