import RestaurantHeaderComponent from "@/components/allRestaurant/header";
import SearchBarComponent from "@/components/allRestaurant/search";
import SortByComponent from "@/components/allRestaurant/sort";
import RestaurantCard from "@/components/cards/restaurant";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

const RestaurantScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Popular");
  const [filterBy, setFilterBy] = useState("All");
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      imageUri: "https://via.placeholder.com/150",
      name: "McDonald's",
      description: "Fast food restaurant",
      rating: 4.5,
      ratingCount: 250,
      isFavorite: true,
      category: "Fast Food",
    },
    {
      id: 2,
      imageUri: "https://via.placeholder.com/150",
      name: "KFC",
      description: "Fast food restaurant",
      rating: 4.3,
      ratingCount: 200,
      isFavorite: false,
      category: "Fast Food",
    },
    {
      id: 3,
      imageUri: "https://via.placeholder.com/150",
      name: "Olive Garden",
      description: "Italian restaurant",
      rating: 4.7,
      ratingCount: 300,
      isFavorite: false,
      category: "Italian",
    },
    // Add more restaurants as needed
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleFilterChange = (filter: string) => {
    setFilterBy(filter);
  };

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterBy === "All" || restaurant.category === filterBy)
  );

  const sortedRestaurants = filteredRestaurants.sort((a, b) => {
    if (sortBy === "Popular") {
      return b.rating - a.rating;
    } else if (sortBy === "Rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <SafeAreaView style={styles.container}>
      <RestaurantHeaderComponent
        onBackPress={() => router.back()}
        categoryTitle="Restaurants"
      />
      <View style={styles.content}>
        <SearchBarComponent searchQuery={searchQuery} onSearch={handleSearch} />
        <SortByComponent
          sortBy={sortBy}
          onSortChange={handleSortChange}
          filterBy={filterBy}
          onFilterChange={handleFilterChange}
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              imageUri={restaurant.imageUri}
              name={restaurant.name}
              description={restaurant.description}
              rating={restaurant.rating}
              ratingCount={restaurant.ratingCount}
              isFavorite={restaurant.isFavorite}
              onFavoriteToggle={() => console.log("Favorite Toggled")}
              deliveryTime={""}
              tags={[]}
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
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    flex: 1,
  },
});

export default RestaurantScreen;
