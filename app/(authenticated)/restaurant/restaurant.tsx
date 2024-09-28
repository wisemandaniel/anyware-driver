import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
} from "react-native";
import CategorySelectorComponent from "@/components/restaurant/categorySelection";
import HeaderComponent from "@/components/restaurant/header";
import FeaturedRestaurantsComponent from "@/components/restaurant/restaurant";
import SearchBarComponent from "@/components/restaurant/searchbar";
import { getAllRestaurants, Restaurant } from "@/functions/restaurant";
import { IAppState } from "@/store/interface";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import RestaurantSkeleton from "@/components/skeleton/restaurant";
import { setAllRestaurant } from "@/store/system_persist";

const HomeScreen: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const router = useRouter();
  const dispatch = useDispatch()
  

  useEffect(() => {
    fetchRestaurants();
  }, [token]);

  const fetchRestaurants = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const data = await getAllRestaurants(token);
      setRestaurants(data);
      dispatch(setAllRestaurant(data))
      console.log(data)
    } catch (error) {
      Alert.alert("Error", "Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <RestaurantSkeleton />;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <HeaderComponent />
        <ScrollView style={styles.content}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              What would you like to order
            </Text>
          </View>
          <SearchBarComponent />
          <FeaturedRestaurantsComponent restaurants={restaurants}/>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  content: {
    flex: 1,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 44,
    width: "80%",
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;
