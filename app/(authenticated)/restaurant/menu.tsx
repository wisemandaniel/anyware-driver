import EmptyState from "@/components/cards/empty";
import Loader from "@/components/loader";
import HeaderBack from "@/components/menu/back";
import HeaderComponent from "@/components/menu/header";
import OperatingHoursComponent from "@/components/menu/openningHours";
import OtherDaysMenuComponent from "@/components/menu/otherDays";
import RelatedRestaurantsComponent from "@/components/menu/relatedRestaurant";
import ReviewsAndRatingsComponent from "@/components/menu/review";
import TodayMenuComponent from "@/components/menu/today";
import { getMenuByRestaurantId, Menu } from "@/functions/menu";
import { Restaurant } from "@/functions/restaurant";
import { IAppState } from "@/store/interface";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux";

const MenuScreen: React.FC = () => {
  const reviews = [
    {
      username: "John Doe",
      rating: 4.5,
      description: "Chicken, Cheese and pineapple",

      comment: "Great food!",
      profileImageUri: "https://via.placeholder.com/40",
    },
    {
      username: "Jane Smith",
      rating: 5.0,
      comment: "Excellent service!",
      profileImageUri: "https://via.placeholder.com/40",
    },
  ];

  const relatedRestaurants = [
    {
      name: "Restaurant A",
      imageUri: "https://via.placeholder.com/80",
      rating: 4.3,
    },
    {
      name: "Restaurant B",
      imageUri: "https://via.placeholder.com/80",
      rating: 4.7,
    },
    {
      name: "Restaurant C",
      imageUri: "https://via.placeholder.com/80",
      rating: 4.6,
    },
  ];

  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const restaurantId = "some-restaurant-id"; // Replace with actual restaurant ID
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const currentRestaurant = useSelector(
    (state: IAppState) => state.systemPersist.currentRestaurant
  );

  useEffect(() => {
    fetchMenus();
  }, [token]);

  const fetchMenus = async () => {
    if (!token) return;

    console.log(currentRestaurant);

    try {
      setLoading(true);
      const data = await getMenuByRestaurantId(
        currentRestaurant._id || "",
        token
      );
      setMenus(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchMenus();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderBack
        onBackPress={() => router.back()}
        onFavoriteToggle={() => {
          console.log("hello");
        }}
        isFavorite={true}
      />
      <HeaderComponent
        imageUri={currentRestaurant.image || ""}
        name={currentRestaurant.name || ""}
        rating={4.5}
        description="Fast food restaurant serving burgers, fries, and more."
      />
      <TodayMenuComponent menuItems={menus} />
      {!loading && menus.length === 0 ? (
        <EmptyState
          iconName="fast-food-outline"
          message="No Menus Found"
          subMessage="Try refreshing the page."
          onPressSubMessage={handleRetry}
        />
      ) : undefined}
      {/* <OtherDaysMenuComponent /> */}
      <OperatingHoursComponent openingHours="8:00 AM" closingHours="10:00 PM" />
      {/* <ReviewsAndRatingsComponent reviews={reviews} /> */}
      {/* <RelatedRestaurantsComponent restaurants={relatedRestaurants} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MenuScreen;
