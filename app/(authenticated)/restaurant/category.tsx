import FoodItemCard from "@/components/cards/meal";
import CategoryHeaderComponent from "@/components/category/header";
import SearchBarComponent from "@/components/category/searchBar";
import SortByComponent from "@/components/category/sortBy";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

const CategoryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Popular");
  const [items, setItems] = useState([
    {
      id: 1,
      imageUri: "https://via.placeholder.com/150",
      name: "Chicken Hawaiian",
      description: "Chicken, Cheese and pineapple",
      price: "$10.35",
      rating: 4.5,
      ratingCount: 25,
      isFavorite: true,
    },
    {
      id: 2,
      imageUri: "https://via.placeholder.com/150",
      name: "Greek Salad",
      description: "with baked salmon",
      price: "$12.00",
      rating: 4.7,
      ratingCount: 30,
      isFavorite: false,
    },
    {
      id: 3,
      imageUri: "https://via.placeholder.com/150",
      name: "Greek Salad",
      description: "with baked salmon",
      price: "$12.00",
      rating: 4.7,
      ratingCount: 30,
      isFavorite: false,
    },
    {
      id: 4,
      imageUri: "https://via.placeholder.com/150",
      name: "Greek Salad",
      description: "with baked salmon",
      price: "$12.00",
      rating: 4.7,
      ratingCount: 30,
      isFavorite: false,
    },
    {
      id: 5,
      imageUri: "https://via.placeholder.com/150",
      name: "Greek Salad",
      description: "with baked salmon",
      price: "$12.00",
      rating: 4.7,
      ratingCount: 30,
      isFavorite: false,
    },
    // Add more items as needed
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortBy === "Popular") {
      return b.rating - a.rating;
    } else if (sortBy === "Price") {
      return (
        parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1))
      );
    }
    return 0;
  });

  return (
    <SafeAreaView style={styles.container}>
      <CategoryHeaderComponent
        onBackPress={() => router.back()}
        categoryImageUri="https://via.placeholder.com/400"
        categoryTitle="Fast Food"
        itemCount={80}
      />
      <View style={styles.content}>
        <SearchBarComponent searchQuery={searchQuery} onSearch={handleSearch} />
        <SortByComponent sortBy={sortBy} onSortChange={handleSortChange} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {sortedItems.map((item) => (
            <FoodItemCard
              key={item.id}
              imageUri={item.imageUri}
              name={item.name}
              description={item.description}
              price={item.price}
              rating={item.rating}
              ratingCount={item.ratingCount}
              isFavorite={item.isFavorite}
              onFavoriteToggle={() => console.log("Favorite Toggled")}
              width={"100%"}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    padding: 20,
    flex: 1,
  },
});

export default CategoryScreen;
