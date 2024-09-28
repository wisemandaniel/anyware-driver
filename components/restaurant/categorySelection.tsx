import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface CategoryProps {
  name: string;
  iconUri: string;
  isSelected?: boolean;
}

const CategorySelectorComponent: React.FC = () => {
  const categories: CategoryProps[] = [
    {
      name: "Burger",
      iconUri: "https://via.placeholder.com/40",
      isSelected: true,
    },
    { name: "Donat", iconUri: "https://via.placeholder.com/40" },
    { name: "Pizza", iconUri: "https://via.placeholder.com/40" },
    { name: "Mexican", iconUri: "https://via.placeholder.com/40" },
    { name: "Asian", iconUri: "https://via.placeholder.com/40" },
  ];

  return (
    <View style={styles.categoriesContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryButton,
            category.isSelected && styles.selectedCategory,
          ]}
          onPress={()=>{router.push("/restaurant/category")}}
        >
          <Image
            source={{ uri: category.iconUri }}
            style={styles.categoryIcon}
          />
          <Text
            style={[
              styles.categoryText,
              category.isSelected && styles.selectedCategoryText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  categoryButton: {
    alignItems: "center",
    padding: 10,
  },
  selectedCategory: {
    backgroundColor: "#FF6F00",
    borderRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    borderRadius: 40,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  selectedCategoryText: {
    color: "#fff",
  },
});

export default CategorySelectorComponent;
