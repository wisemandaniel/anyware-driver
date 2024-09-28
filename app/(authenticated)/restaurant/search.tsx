import RestaurantCard from "@/components/cards/restaurant";
import SearchHeaderComponent from "@/components/search/hearder";
import SearchBarComponent from "@/components/search/search";
import SortByComponent from "@/components/search/sort";
import { IAppState } from "@/store/interface";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Popular");
  const [filterBy, setFilterBy] = useState("All");
  const restaurants = useSelector(
    (state: IAppState) => state.systemPersist.allRestaurant
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setFilterBy(filter);
  };

  const filteredItems = restaurants.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeaderComponent
        onBackPress={() => router.back()}
        searchTitle="Search"
      />
      <View style={styles.content}>
        <SearchBarComponent searchQuery={searchQuery} onSearch={handleSearch} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredItems.map((item) => (
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

export default SearchScreen;
