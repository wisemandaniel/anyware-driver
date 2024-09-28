import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

interface HeaderComponentProps {
  imageUri: string;
  name: string;
  rating: number;
  description: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  imageUri,
  name,
  rating,
  description,
}) => {
  return (
    <View style={styles.header}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
          }}
        >
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    marginTop: 40,
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "flex-start",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  rating: {
    fontSize: 18,
    marginLeft: 5,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});

export default HeaderComponent;
