import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ReviewProps {
  username: string;
  rating: number;
  comment: string;
  profileImageUri: string;
}

const Review: React.FC<ReviewProps> = ({
  username,
  rating,
  comment,
  profileImageUri,
}) => {
  return (
    <View style={styles.review}>
      <View style={styles.header}>
        <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
        <View style={styles.ratingContainer}>
          <Feather name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  review: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#FF6F0070",
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

export default Review;
