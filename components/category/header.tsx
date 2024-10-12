import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

interface CategoryHeaderComponentProps {
  onBackPress: () => void;
  categoryImageUri: string;
  categoryTitle: string;
  itemCount: number;
}

const CategoryHeaderComponent: React.FC<CategoryHeaderComponentProps> = ({
  onBackPress,
  categoryImageUri,
  categoryTitle,
  itemCount,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{categoryTitle}</Text>
      <Text style={styles.itemCount}>
        {itemCount} type of {categoryTitle.toLowerCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#00000050",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6F00",
  },
  itemCount: {
    fontSize: 16,
    color: "#666",
  },
});

export default CategoryHeaderComponent;
